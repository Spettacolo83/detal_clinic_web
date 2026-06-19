import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Content />;
}

function Content() {
  const t = useTranslations("home");
  return (
    <main className="py-24 md:py-32">
      <Container width="wide">
        <Eyebrow tone="primary">{t("heroEyebrow")}</Eyebrow>
        <h1 className="mt-6 text-5xl leading-tight md:text-7xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-[color:var(--color-muted)] md:text-lg">
          {t("heroSubtitle")}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/services" size="lg">
            {t("heroPrimaryCta")}
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            {t("heroSecondaryCta")} →
          </Button>
        </div>
      </Container>
    </main>
  );
}
