import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ToothLogo } from "@/components/ui/ToothLogo";
import { getFlagshipServices, getLocalizedService, getAllClinics, getLocalizedClinic, formatPriceRange } from "@/data/dentalia";
import { SITE_IMAGES, CLINIC_IMAGES } from "@/lib/images";
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
      <FirstVisitBanner />
    </>
  );
}

function Hero() {
  const t = useTranslations("home");
  return (
    <section className="relative isolate overflow-hidden border-b border-[color:var(--color-hairline)]">
      <Image
        src={SITE_IMAGES.parallax}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/55 to-black/25 md:from-black/65 md:via-black/45 md:to-black/15" />
      <Container width="wide">
        <div className="grid min-h-[78vh] items-center pb-16 pt-24 md:pb-24 md:pt-32">
          <div className="max-w-3xl">
            <Eyebrow tone="muted" className="!text-white/80">{t("heroEyebrow")}</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.05] text-white md:text-7xl" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}>
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}>
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
  const icons = ["💙", "🦷", "🌿", "✓"];
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-lg">
                <span aria-hidden="true">{icons[i] ?? "✓"}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[color:var(--color-ink)]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">{p.body}</p>
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
    <section className="relative border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-20 md:py-28">
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
  const tClin = useTranslations("clinics");
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
        <div className="mt-14 space-y-6">
          {clinics.map((c) => {
            const loc = getLocalizedClinic(c, locale);
            return (
              <Link
                key={c.id_suggested}
                href={`/clinics/${c.id_suggested}`}
                className="group block overflow-hidden rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] transition-all hover:border-[color:var(--color-primary)] hover:shadow-lg"
              >
                <div className="grid md:grid-cols-12">
                  <div className="relative md:col-span-5">
                    <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[260px]">
                      <Image
                        src={CLINIC_IMAGES[c.id_suggested] ?? SITE_IMAGES.heroHome}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-6 md:col-span-7 md:p-10">
                    <Eyebrow tone="accent">{c.city}</Eyebrow>
                    <h3 className="text-2xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-primary)] transition-colors md:text-3xl">{loc.name}</h3>
                    <p className="text-sm leading-relaxed text-[color:var(--color-muted)] md:text-base">{loc.neighborhood_description}</p>
                    <p className="mt-2 text-sm font-medium text-[color:var(--color-primary)]">
                      {tClin("discoverCta")} →
                    </p>
                  </div>
                </div>
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

function FirstVisitBanner() {
  const t = useTranslations("home");
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-primary)] py-20 text-white md:py-28">
      <div className="absolute inset-0 -z-10 opacity-25">
        <Image
          src={SITE_IMAGES.firstVisit}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <Container width="default">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <Eyebrow tone="muted" className="!text-white/80">{t("firstVisitEyebrow")}</Eyebrow>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{t("firstVisitTitle")}</h2>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">{t("firstVisitBody")}</p>
            <div className="mt-10">
              <Button href="/contact#book" variant="accent" size="lg">{t("firstVisitCta")}</Button>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur md:h-60 md:w-60">
              <ToothLogo
                className="h-24 w-24 text-white md:h-32 md:w-32"
                primaryColor="white"
                accentColor="rgba(255,255,255,0.6)"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
