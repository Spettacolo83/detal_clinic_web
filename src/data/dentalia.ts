import type { Service, Clinic, TeamMember, ServiceCategory, ServiceTranslation, ClinicTranslation, TeamMemberTranslation } from "@/types/dentalia";
import rawServices from "./services.json";
import rawClinics from "./clinics.json";
import rawTeam from "./team.json";

const services = rawServices as unknown as ReadonlyArray<Service>;
const clinics = rawClinics as unknown as ReadonlyArray<Clinic>;
const team = rawTeam as unknown as ReadonlyArray<TeamMember>;

export function getAllServices(): ReadonlyArray<Service> {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.id_suggested === slug);
}

export function getServicesByCategory(cat: ServiceCategory): ReadonlyArray<Service> {
  return services.filter((s) => s.category === cat);
}

const HOME_FEATURED_IDS = [
  "visita-di-controllo",
  "igiene-dentale-professionale",
  "otturazioni-estetiche",
  "sbiancamento-professionale",
] as const;

export function getFlagshipServices(): ReadonlyArray<Service> {
  return HOME_FEATURED_IDS
    .map((id) => services.find((s) => s.id_suggested === id))
    .filter((s): s is Service => Boolean(s));
}

export function getAllClinics(): ReadonlyArray<Clinic> {
  return clinics;
}

export function getClinicBySlug(slug: string): Clinic | undefined {
  return clinics.find((c) => c.id_suggested === slug);
}

export function getAllTeam(): ReadonlyArray<TeamMember> {
  return team;
}

export function getTeamByClinic(clinicId: string): ReadonlyArray<TeamMember> {
  return team.filter((t) => t.clinic_id_suggested === clinicId);
}

export function getLocalizedService(s: Service, locale: string): ServiceTranslation {
  const l = (["en","it","es"].includes(locale) ? locale : "en") as "en"|"it"|"es";
  return s.i18n[l];
}

export function getLocalizedClinic(c: Clinic, locale: string): ClinicTranslation {
  const l = (["en","it","es"].includes(locale) ? locale : "en") as "en"|"it"|"es";
  return c.i18n[l];
}

export function getLocalizedTeam(t: TeamMember, locale: string): TeamMemberTranslation {
  const l = (["en","it","es"].includes(locale) ? locale : "en") as "en"|"it"|"es";
  return t.i18n[l];
}

export function formatPriceRange(from: number, to: number, locale: string): string {
  const fmt = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  if (from === 0 && to === 0) return "—";
  if (from === 0) return `${fmt.format(to)}`;
  return `${fmt.format(from)} – ${fmt.format(to)}`;
}
