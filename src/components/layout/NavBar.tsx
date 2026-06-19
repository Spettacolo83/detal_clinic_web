import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PRIMARY_NAV } from "@/lib/nav";
import { BRAND_NAME } from "@/lib/brand";

export function NavBar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]/85 backdrop-blur">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="text-2xl tracking-tight text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)", fontWeight: 700 }}
            aria-label={BRAND_NAME}
          >
            Dental<span className="text-[color:var(--color-primary)]">IA</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-[color:var(--color-ink)] hover:text-[color:var(--color-primary)] transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
