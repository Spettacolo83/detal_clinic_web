import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllClinics, getLocalizedClinic } from "@/data/dentalia";
import { getClinicImage } from "@/lib/images";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("body") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("contact");
  const tClin = useTranslations("clinics");
  const locale = useLocale();
  const clinics = getAllClinics();

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] py-20 md:py-28">
        <Container width="wide">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">{t("body")}</p>
          <p className="mt-6 text-base">
            <span className="text-[color:var(--color-muted)]">{t("emailLabel")}: </span>
            <a href={`mailto:${t("emailGeneral")}`} className="text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)] underline decoration-[color:var(--color-hairline)] underline-offset-4">{t("emailGeneral")}</a>
          </p>
        </Container>
      </section>

      <section id="book" className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-6 md:grid-cols-3">
            {clinics.map((c) => {
              const loc = getLocalizedClinic(c, locale);
              return (
                <div key={c.id_suggested} className="overflow-hidden rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={getClinicImage(c.id_suggested)}
                      alt={loc.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Eyebrow tone="accent">{c.city}</Eyebrow>
                    <p className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">{loc.name}</p>
                    <p className="mt-2 text-sm text-[color:var(--color-muted)]">{c.address_full}</p>
                    <div className="mt-5 space-y-2 border-t border-[color:var(--color-hairline)] pt-4 text-sm">
                      <a href={`tel:${c.phone.replace(/\s+/g,"")}`} className="block text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)]">
                        <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">{tClin("phoneHeading")}</span>
                        <br />{c.phone}
                      </a>
                      <a href={`mailto:${c.email}`} className="block text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)]">
                        <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">{tClin("emailHeading")}</span>
                        <br />{c.email}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
