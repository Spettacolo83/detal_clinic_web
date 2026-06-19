import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getFlagshipServices, getLocalizedService, getAllClinics, getLocalizedClinic, formatPriceRange } from "@/data/dentalia";
import type { ServiceCategory } from "@/types/dentalia";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesShowcase />
      <ClinicsOverview />
      <TeamTeaser />
      <ConciergeBanner />
    </>
  );
}

function Hero() {
  const t = useTranslations("home");
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in srgb, var(--color-primary) 35%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container width="wide">
        <div className="grid min-h-[78vh] items-center pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="max-w-3xl">
            <Eyebrow tone="primary">{t("heroEyebrow")}</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.05] text-[color:var(--color-ink)] md:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-[color:var(--color-muted)] md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/services" size="lg">{t("heroPrimaryCta")}</Button>
              <Button href="/contact#book" variant="accent" size="lg">{t("heroSecondaryCta")}</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValueProps() {
  const t = useTranslations("home");
  const props = t.raw("valueProps") as Array<{ title: string; body: string }>;
  return (
    <section className="py-20 md:py-28">
      <Container width="wide">
        <div className="max-w-2xl">
          <Eyebrow>{t("valuePropsEyebrow")}</Eyebrow>
          <h2 className="mt-4 text-4xl text-[color:var(--color-ink)] md:text-5xl">{t("valuePropsTitle")}</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {props.map((p, i) => (
            <div key={i} className="rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">{p.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesShowcase() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const flagship = getFlagshipServices();
  return (
    <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-20 md:py-28">
      <Container width="wide">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow tone="primary">{t("servicesEyebrow")}</Eyebrow>
            <h2 className="mt-4 text-4xl text-[color:var(--color-ink)] md:text-5xl">{t("servicesTitle")}</h2>
            <p className="mt-6 max-w-md text-base text-[color:var(--color-muted)] md:text-lg">{t("servicesBody")}</p>
            <div className="mt-8">
              <Button href="/services" size="lg" variant="secondary">{t("servicesCta")} →</Button>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="grid gap-4">
              {flagship.map((s) => {
                const loc = getLocalizedService(s, locale);
                const price = formatPriceRange(s.price_orientative_eur_from, s.price_orientative_eur_to, locale);
                return (
                  <Link key={s.id_suggested} href={`/services/${s.id_suggested}`} className="group flex items-baseline justify-between gap-6 rounded-[8px] border border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)] px-6 py-5 transition-colors hover:border-[color:var(--color-primary)]">
                    <div>
                      <Eyebrow tone="primary">{tServices(`cat_${s.category}` as `cat_${ServiceCategory}`)}</Eyebrow>
                      <p className="mt-2 text-lg font-semibold text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)] transition-colors">{loc.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">{tServices("priceFromLabel")}</span>
                      <p className="text-sm font-semibold text-[color:var(--color-ink)]">{price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ClinicsOverview() {
  const t = useTranslations("home");
  const locale = useLocale();
  const clinics = getAllClinics();
  return (
    <section className="py-20 md:py-28">
      <Container width="wide">
        <div className="max-w-2xl">
          <Eyebrow>{t("clinicsEyebrow")}</Eyebrow>
          <h2 className="mt-4 text-4xl text-[color:var(--color-ink)] md:text-5xl">{t("clinicsTitle")}</h2>
          <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">{t("clinicsBody")}</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {clinics.map((c) => {
            const loc = getLocalizedClinic(c, locale);
            return (
              <Link key={c.id_suggested} href={`/clinics/${c.id_suggested}`} className="group block rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-8 transition-all hover:border-[color:var(--color-primary)] hover:shadow-lg">
                <Eyebrow tone="accent">{c.city}</Eyebrow>
                <h3 className="mt-4 text-2xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)] transition-colors">{loc.name}</h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{loc.neighborhood_description}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TeamTeaser() {
  const t = useTranslations("home");
  return (
    <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-20 md:py-28">
      <Container width="default" className="text-center">
        <Eyebrow tone="primary">{t("teamEyebrow")}</Eyebrow>
        <h2 className="mt-4 text-4xl text-[color:var(--color-ink)] md:text-5xl">{t("teamTitle")}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">{t("teamBody")}</p>
        <div className="mt-10">
          <Button href="/team" variant="secondary" size="lg">{t("teamEyebrow")} →</Button>
        </div>
      </Container>
    </section>
  );
}

function ConciergeBanner() {
  const t = useTranslations("home");
  return (
    <section id="concierge" className="bg-[color:var(--color-primary)] py-20 text-white md:py-28">
      <Container width="default">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow tone="muted" className="!text-white/80">{t("conciergeEyebrow")}</Eyebrow>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{t("conciergeTitle")}</h2>
            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{t("conciergeBody")}</p>
            <div className="mt-10">
              <Button href="#" variant="accent" size="lg">{t("conciergeCta")}</Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-white/30 md:h-72 md:w-72" aria-hidden="true">
              <div className="absolute inset-0 animate-ping rounded-full border border-white/30" />
              <div className="absolute inset-4 rounded-full border border-white/30" />
              <div className="absolute inset-8 rounded-full border border-white/40" />
              <div className="h-3 w-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
