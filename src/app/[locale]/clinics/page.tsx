import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllClinics, getLocalizedClinic } from "@/data/dentalia";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clinics" });
  return { title: t("title") };
}

export default async function ClinicsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("clinics");
  const locale = useLocale();
  const clinics = getAllClinics();

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] py-20 md:py-28">
        <Container width="wide">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">
            {t("title")}
          </h1>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-8 md:grid-cols-3">
            {clinics.map((c) => {
              const loc = getLocalizedClinic(c, locale);
              return (
                <Link
                  key={c.id_suggested}
                  href={`/clinics/${c.id_suggested}`}
                  className="group block rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-8 transition-all hover:border-[color:var(--color-primary)] hover:shadow-lg"
                >
                  <Eyebrow tone="accent">{c.city}</Eyebrow>
                  <h3 className="mt-4 text-2xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)] transition-colors">
                    {loc.name}
                  </h3>
                  <p className="mt-4 text-sm text-[color:var(--color-muted)]">{loc.neighborhood_description}</p>
                  <div className="mt-6 border-t border-[color:var(--color-hairline)] pt-4 text-xs uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    {c.address_full}
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
