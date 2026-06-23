import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getAllClinics, getClinicBySlug, getLocalizedClinic, getServiceBySlug, getLocalizedService, getTeamByClinic, getLocalizedTeam } from "@/data/dentalia";
import { getClinicImage, getOpenStreetMapEmbed, getOpenStreetMapLink, getTeamPhoto } from "@/lib/images";
import { routing } from "@/i18n/routing";
import type { ClinicId } from "@/types/dentalia";

export function generateStaticParams() {
  const slugs = getAllClinics().map((c) => c.id_suggested);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getClinicBySlug(slug as ClinicId);
  if (!c) return { title: "Not found · DentalIA" };
  const loc = getLocalizedClinic(c, locale);
  return { title: loc.name, description: loc.neighborhood_description };
}

const DAY_TRANS = {
  monday: "mondayShort", tuesday: "tuesdayShort", wednesday: "wednesdayShort",
  thursday: "thursdayShort", friday: "fridayShort", saturday: "saturdayShort", sunday: "sundayShort",
} as const;

export default async function ClinicDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const c = getClinicBySlug(slug as ClinicId);
  if (!c) notFound();
  return <Content slug={slug as ClinicId} />;
}

function Content({ slug }: { slug: ClinicId }) {
  const t = useTranslations("clinics");
  const tTeam = useTranslations("team");
  const locale = useLocale();
  const c = getClinicBySlug(slug);
  if (!c) return null;
  const loc = getLocalizedClinic(c, locale);
  const team = getTeamByClinic(slug);
  const paragraphs = loc.clinic_intro.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const mapSrc = getOpenStreetMapEmbed(c.coordinates.lat, c.coordinates.lng);
  const mapLink = getOpenStreetMapLink(c.coordinates.lat, c.coordinates.lng);

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
        <Container width="wide" className="py-6">
          <Link href="/clinics" className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-primary)]">
            ← {t("eyebrow")}
          </Link>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-hairline)]">
        <Container width="wide" className="pt-10 md:pt-14">
          <Eyebrow tone="accent">{c.city}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-[color:var(--color-ink)] md:text-6xl">{loc.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--color-muted)]">{loc.neighborhood_description}</p>
          <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-[12px] md:aspect-[21/8]">
            <Image
              src={getClinicImage(c.id_suggested)}
              alt={loc.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-12 md:py-16">
        <Container width="wide">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Eyebrow>{t("addressHeading")}</Eyebrow>
              <p className="mt-3 text-sm text-[color:var(--color-ink)]">{c.address_full}</p>
              <a href={mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)]">
                {t("directionsCta")} →
              </a>
            </div>
            <div>
              <Eyebrow>{t("phoneHeading")}</Eyebrow>
              <a href={`tel:${c.phone.replace(/\s+/g,"")}`} className="mt-3 block text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)]">{c.phone}</a>
              <Eyebrow className="mt-6 block">{t("emailHeading")}</Eyebrow>
              <a href={`mailto:${c.email}`} className="mt-3 block text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)]">{c.email}</a>
            </div>
            <div>
              <Eyebrow>{t("hoursHeading")}</Eyebrow>
              <ul className="mt-3 space-y-1 text-sm">
                {c.opening_hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-[color:var(--color-ink)]">
                    <span className="text-[color:var(--color-muted)]">{t(DAY_TRANS[h.day])}</span>
                    <span>{h.closed ? t("closedLabel") : `${h.open} ${t("openCloseSep")} ${h.close}`}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>{t("accessHeading")}</Eyebrow>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]">{t("transportLabel")}</p>
              <p className="mt-1 text-sm text-[color:var(--color-ink)]">{c.public_transport}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]">{t("parkingLabel")}</p>
              <p className="mt-1 text-sm text-[color:var(--color-ink)]">{c.parking}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-[color:var(--color-ink)] md:text-lg" style={{ fontFamily: "var(--font-inter)" }}>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="md:col-span-5">
              <Eyebrow tone="primary">{t("mapHeading")}</Eyebrow>
              <div className="mt-4 overflow-hidden rounded-[12px] border border-[color:var(--color-hairline)]">
                <iframe
                  title={`Mappa ${loc.name}`}
                  src={mapSrc}
                  className="aspect-[4/3] w-full"
                  loading="lazy"
                />
              </div>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-dark)]"
              >
                {t("directionsCta")} →
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-16 md:py-24">
        <Container width="wide">
          <Eyebrow tone="primary">{t("servicesHeading")}</Eyebrow>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.services_offered.map((sid) => {
              const s = getServiceBySlug(sid);
              if (!s) return null;
              const sLoc = getLocalizedService(s, locale);
              return (
                <Link key={sid} href={`/services/${sid}`} className="group block rounded-[8px] border border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)] px-5 py-4 text-sm transition-colors hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]">
                  {sLoc.name} →
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <Eyebrow>{t("teamHeading")}</Eyebrow>
          <h2 className="mt-3 text-3xl text-[color:var(--color-ink)]">{c.dr_lead_name}</h2>
          <p className="mt-2 text-sm text-[color:var(--color-muted)]">{c.dr_lead_credentials}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => {
              const mLoc = getLocalizedTeam(m, locale);
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
                    <p className="mt-3 text-sm text-[color:var(--color-muted)]">{mLoc.bio_short}</p>
                    <p className="mt-4 text-xs text-[color:var(--color-muted)]">{m.years_experience} {tTeam("yearsLabel")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-primary)] py-16 text-white md:py-20">
        <Container width="default" className="text-center">
          <Eyebrow tone="muted" className="!text-white/80">{t("eyebrow")}</Eyebrow>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("bookCta")}</h2>
          <div className="mt-8">
            <Button href="/contact#book" size="lg" variant="accent">
              {t("bookCta")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
