export type ServiceCategory =
  | "preventiva"
  | "conservativa"
  | "estetica"
  | "ortodonzia"
  | "chirurgia"
  | "pediatrica";

export type ServiceTranslation = {
  name: string;
  tagline: string;
  description_short: string;
  description_long: string;
  who_for: ReadonlyArray<string>;
  benefits: ReadonlyArray<string>;
  process_steps: ReadonlyArray<string>;
  faq: ReadonlyArray<{ q: string; a: string }>;
};

export type Service = {
  id_suggested: string;
  category: ServiceCategory;
  icon_keyword: string;
  priority: 1 | 2 | 3;
  price_orientative_eur_from: number;
  price_orientative_eur_to: number;
  duration_minutes: number;
  sessions_typical: number;
  i18n: {
    en: ServiceTranslation;
    it: ServiceTranslation;
    es: ServiceTranslation;
  };
};

export type ClinicId = "roma" | "palma" | "london";

export type OpeningHours = {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  open?: string;
  close?: string;
  closed?: boolean;
};

export type ClinicTranslation = {
  name: string;
  neighborhood_description: string;
  clinic_intro: string;
  team_intro_short: string;
};

export type Clinic = {
  id_suggested: ClinicId;
  city: string;
  address_full: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  opening_hours: ReadonlyArray<OpeningHours>;
  parking: string;
  public_transport: string;
  services_offered: ReadonlyArray<string>;
  dr_lead_name: string;
  dr_lead_credentials: string;
  i18n: {
    en: ClinicTranslation;
    it: ClinicTranslation;
    es: ClinicTranslation;
  };
};

export type TeamMemberTranslation = { bio_short: string };

export type TeamMember = {
  id_suggested: string;
  name: string;
  clinic_id_suggested: ClinicId;
  role: string;
  years_experience: number;
  specialties: ReadonlyArray<string>;
  i18n: {
    en: TeamMemberTranslation;
    it: TeamMemberTranslation;
    es: TeamMemberTranslation;
  };
};
