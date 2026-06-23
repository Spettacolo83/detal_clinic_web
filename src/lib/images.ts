export const SITE_IMAGES = {
  heroHome: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2000&q=80",
  parallax: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2400&q=80",
  firstVisit: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
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
  "francesca-conti": "https://images.pexels.com/photos/37406608/pexels-photo-37406608.jpeg?auto=compress&cs=tinysrgb&w=900",
  "elena-vidal": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=900",
  "javier-roig": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",
  "marta-cifre": "https://images.pexels.com/photos/6749765/pexels-photo-6749765.jpeg?auto=compress&cs=tinysrgb&w=900",
  "claudia-martinez": "https://images.pexels.com/photos/7904416/pexels-photo-7904416.jpeg?auto=compress&cs=tinysrgb&w=900",
  "james-whitfield": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
  "sophie-laurent": "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80",
  "alessandro-greco": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80",
};

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
