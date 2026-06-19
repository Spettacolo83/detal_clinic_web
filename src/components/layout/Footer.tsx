import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ToothLogo } from "@/components/ui/ToothLogo";
import { PRIMARY_NAV } from "@/lib/nav";
import { BRAND_NAME } from "@/lib/brand";

const LEGAL_LINKS = [
  { key: "legalImprint" as const, href: "/imprint" },
  { key: "legalPrivacy" as const, href: "/privacy" },
  { key: "legalTerms" as const, href: "/terms" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="mt-24 border-t border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
      <Container width="wide">
        <div className="grid gap-12 py-16 md:grid-cols-3 md:gap-10 md:py-20">
          <div>
            <div
              className="flex items-center gap-2 text-3xl text-[color:var(--color-ink)]"
              style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700 }}
            >
              <ToothLogo className="h-9 w-9 text-[color:var(--color-primary)]" />
              <span>
                Dental<span className="text-[color:var(--color-primary)]">IA</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-muted)]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("navHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)] transition-colors"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("legalHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)] transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--color-hairline)] py-6 text-xs text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. {t("credit")}
          </p>
          <Link
            href="/imprint"
            className="hover:text-[color:var(--color-primary)] transition-colors"
          >
            {t("creditLinkLabel")} →
          </Link>
        </div>
      </Container>
    </footer>
  );
}
