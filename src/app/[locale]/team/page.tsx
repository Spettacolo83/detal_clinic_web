import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllTeam, getLocalizedTeam, getClinicBySlug, getLocalizedClinic } from "@/data/dentalia";
import { getTeamPhoto } from "@/lib/images";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("team");
  const locale = useLocale();
  const members = getAllTeam();

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] py-20 md:py-28">
        <Container width="wide">
          <Eyebrow tone="primary">{t("eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">{t("subtitle")}</p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              const loc = getLocalizedTeam(m, locale);
              const clinic = getClinicBySlug(m.clinic_id_suggested);
              const clinicName = clinic ? getLocalizedClinic(clinic, locale).name : m.clinic_id_suggested;
              return (
                <div key={m.id_suggested} className="overflow-hidden rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)]">
                  <div className="relative aspect-square w-full bg-[color:var(--color-canvas)]">
                    <Image
                      src={getTeamPhoto(m.id_suggested)}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-semibold text-[color:var(--color-ink)]">{m.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--color-primary)]">{m.role}</p>
                    <p className="mt-4 text-sm text-[color:var(--color-muted)]">{loc.bio_short}</p>
                    <div className="mt-6 flex items-baseline justify-between border-t border-[color:var(--color-hairline)] pt-4 text-xs">
                      <span className="text-[color:var(--color-muted)]">{m.years_experience} {t("yearsLabel")}</span>
                      <span className="text-[color:var(--color-primary)]">{clinicName}</span>
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
