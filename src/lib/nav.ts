export type NavItem = {
  key: "services" | "clinics" | "team" | "contact";
  href: string;
};

export const PRIMARY_NAV: ReadonlyArray<NavItem> = [
  { key: "services", href: "/services" },
  { key: "clinics", href: "/clinics" },
  { key: "team", href: "/team" },
  { key: "contact", href: "/contact" },
];
