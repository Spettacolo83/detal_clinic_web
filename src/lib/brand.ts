import type { Locale } from "@/i18n/routing";

export const BRAND_NAME = "DentalIA" as const;
export const ASSISTANT_NAME = "Sofia" as const;

export const FTFAI_URL = "https://www.followtheflowai.com" as const;

export const TAGLINE_BY_LOCALE: Record<Locale, string> = {
  en: "Smile, intelligently cared for.",
  it: "Sorridi, con la cura dell'AI.",
  es: "Sonríe, con el cuidado de la IA.",
};

export function getFtfaiUrl(locale: Locale): string {
  return locale === "en" ? FTFAI_URL : `${FTFAI_URL}/${locale}`;
}

export const CLINICS_CITIES = ["roma", "palma", "london"] as const;
export type ClinicCity = (typeof CLINICS_CITIES)[number];

export const TIMEZONE_BY_LOCALE: Record<Locale, string> = {
  it: "Europe/Rome",
  es: "Europe/Madrid",
  en: "Europe/London",
};
