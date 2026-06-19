import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllServices, getLocalizedService, formatPriceRange } from "@/data/dentalia";
import { getServiceImage } from "@/lib/images";
import { routing } from "@/i18n/routing";
import type { ServiceCategory } from "@/types/dentalia";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

const CATEGORIES: ReadonlyArray<ServiceCategory> = ["preventiva", "conservativa", "estetica", "ortodonzia", "chirurgia", "pediatrica"];

function isCategory(v: string | undefined): v is ServiceCategory {
  return CATEGORIES.includes(v as ServiceCategory);
}

export default async function ServicesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const filter = isCategory(sp.category) ? sp.category : undefined;
  return <ServicesContent locale={locale} filter={filter} />;
}

function ServicesContent({ locale, filter }: { locale: string; filter?: ServiceCategory }) {
  const t = useTranslations("services");
  const services = getAllServices().filter((s) => !filter || s.category === filter);

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] py-20 md:py-28">
        <Container width="wide">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <CatChip label={t("categoryFilter")} href="/services" active={!filter} />
            {CATEGORIES.map((c) => (
              <CatChip key={c} label={t(`cat_${c}` as `cat_${ServiceCategory}`)} href={`/services?category=${c}`} active={filter === c} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const loc = getLocalizedService(s, locale);
              const price = formatPriceRange(s.price_orientative_eur_from, s.price_orientative_eur_to, locale);
              return (
                <Link key={s.id_suggested} href={`/services/${s.id_suggested}`} className="group block overflow-hidden rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] transition-all duration-200 hover:border-[color:var(--color-primary)] hover:shadow-lg">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={getServiceImage(s.category)}
                      alt={loc.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <Eyebrow tone="primary">{t(`cat_${s.category}` as `cat_${ServiceCategory}`)}</Eyebrow>
                      {s.priority === 1 ? (
                        <span className="rounded-[4px] bg-[color:var(--color-accent)]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-accent)]">{t("flagshipLabel")}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)] transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--color-muted)]">{loc.tagline}</p>
                    <div className="mt-5 flex items-baseline justify-between border-t border-[color:var(--color-hairline)] pt-4 text-xs text-[color:var(--color-muted)]">
                      <span>{t("priceFromLabel")} <span className="font-semibold text-[color:var(--color-ink)]">{price}</span></span>
                      <span>{s.duration_minutes}′ · {s.sessions_typical}×</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function CatChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  const cls = active
    ? "bg-[color:var(--color-primary)] border-[color:var(--color-primary)] text-white"
    : "border-[color:var(--color-hairline)] bg-transparent text-[color:var(--color-ink)] hover:border-[color:var(--color-primary)]";
  return (
    <Link href={href} className={`inline-flex items-center rounded-[8px] border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${cls}`}>
      {label}
    </Link>
  );
}
