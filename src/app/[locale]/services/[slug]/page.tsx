import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getAllServices, getServiceBySlug, getLocalizedService, formatPriceRange } from "@/data/dentalia";
import { getServiceImage } from "@/lib/images";
import { routing } from "@/i18n/routing";
import type { ServiceCategory } from "@/types/dentalia";

export function generateStaticParams() {
  const slugs = getAllServices().map((s) => s.id_suggested);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Not found · DentalIA" };
  const loc = getLocalizedService(s, locale);
  return {
    title: loc.name,
    description: loc.description_short,
    openGraph: { title: `${loc.name} · DentalIA`, description: loc.description_short },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const s = getServiceBySlug(slug);
  if (!s) notFound();
  return <Content slug={slug} />;
}

function Content({ slug }: { slug: string }) {
  const t = useTranslations("services");
  const locale = useLocale();
  const s = getServiceBySlug(slug);
  if (!s) return null;
  const loc = getLocalizedService(s, locale);
  const price = formatPriceRange(s.price_orientative_eur_from, s.price_orientative_eur_to, locale);
  const paragraphs = loc.description_long.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <section className="border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
        <Container width="wide" className="py-6">
          <Link href="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-primary)]">
            ← {t("eyebrow")}
          </Link>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow tone="primary">{t(`cat_${s.category}` as `cat_${ServiceCategory}`)}</Eyebrow>
              <h1 className="mt-4 text-4xl leading-tight text-[color:var(--color-ink)] md:text-6xl">{loc.name}</h1>
              <p className="mt-5 text-lg text-[color:var(--color-muted)]">{loc.tagline}</p>
              <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[12px]">
                <Image
                  src={getServiceImage(s.category)}
                  alt={loc.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <aside className="md:col-span-5">
              <div className="rounded-[12px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">{t("priceFromLabel")} {t("priceToLabel")}</p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--color-ink)]">{price}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[color:var(--color-hairline)] pt-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">{t("durationLabel")}</dt>
                    <dd className="mt-1 text-[color:var(--color-ink)]">{s.duration_minutes} min</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">{t("sessionsLabel")}</dt>
                    <dd className="mt-1 text-[color:var(--color-ink)]">{s.sessions_typical}</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Button href="/contact#book" size="lg" className="w-full">{t("bookCta")}</Button>
                  <p className="mt-3 text-xs text-[color:var(--color-muted)]">{t("askHint")}</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-16 md:py-24">
        <Container width="default">
          <div className="space-y-5 text-base leading-relaxed text-[color:var(--color-ink)] md:text-lg" style={{ fontFamily: "var(--font-inter)" }}>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>{t("benefitsHeading")}</Eyebrow>
              <ul className="mt-6 space-y-3">
                {loc.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-[color:var(--color-ink)]">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-primary)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>{t("whoForHeading")}</Eyebrow>
              <ul className="mt-6 space-y-3">
                {loc.who_for.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-[color:var(--color-ink)]">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] py-16 md:py-24">
        <Container width="default">
          <Eyebrow tone="primary">{t("processHeading")}</Eyebrow>
          <ol className="mt-8 space-y-6">
            {loc.process_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-base">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-sm font-semibold text-white">{i + 1}</span>
                <span className="mt-1.5 text-[color:var(--color-ink)]">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {loc.faq.length > 0 ? (
        <section className="py-16 md:py-24">
          <Container width="default">
            <Eyebrow>{t("faqHeading")}</Eyebrow>
            <div className="mt-8 space-y-6">
              {loc.faq.map((f, i) => (
                <details key={i} className="group rounded-[8px] border border-[color:var(--color-hairline)] bg-[color:var(--color-surface)] p-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[color:var(--color-ink)]">
                    {f.q}
                    <span className="text-[color:var(--color-primary)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
