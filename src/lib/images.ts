export const SITE_IMAGES = {
  heroHome: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2000&q=80",
  firstVisit: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
  decorDentalTools: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
  decorPediatric: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
  servicesCatalog: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=80",
  contactBg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=80",
} as const;

export const CLINIC_IMAGES: Record<string, string> = {
  roma: "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=1400",
  palma: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1400",
  london: "https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg?auto=compress&cs=tinysrgb&w=1400",
};

export const TEAM_PHOTOS: Record<string, string> = {
  "marco-rinaldi": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  "giulia-ferrari": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
  "laura-bianchi": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
  "francesca-conti": "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=900&q=80",
  "elena-vidal": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80",
  "javier-roig": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
  "marta-cifre": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
  "claudia-martinez": "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80",
  "james-whitfield": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
  "sophie-laurent": "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80",
  "alessandro-greco": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
};

const SERVICE_CATEGORY_IMAGE: Record<string, string> = {
  preventiva: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  conservativa: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
  estetica: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=1200&q=80",
  ortodonzia: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  chirurgia: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
  pediatrica: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
};

export function getServiceImage(category: string): string {
  return SERVICE_CATEGORY_IMAGE[category] ?? SITE_IMAGES.servicesCatalog;
}

export function getTeamPhoto(id: string): string {
  return TEAM_PHOTOS[id] ?? SITE_IMAGES.heroHome;
}

export function getClinicImage(id: string): string {
  return CLINIC_IMAGES[id] ?? SITE_IMAGES.heroHome;
}

export function getOpenStreetMapEmbed(lat: number, lng: number, zoom = 16): string {
  const delta = 0.005;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export function getOpenStreetMapLink(lat: number, lng: number, zoom = 17): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
}
