export const SITE = {
  name: "Mehal Furniture",
  tagline: "Comfort, class and luxury. Crafted for life.",
  address: "Adyala Road, Rawalpindi",
  phoneDisplay: "0335-5936102",
  /** International format for wa.me links, no plus or spaces. */
  whatsapp: "923355936102",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mehal+Furniture+Adyala+Road+Rawalpindi",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const CATEGORIES = [
  { id: "sofa", label: "Sofa sets" },
  { id: "bedroom", label: "Bedroom" },
  { id: "dining", label: "Dining" },
  { id: "chairs", label: "Chairs" },
  { id: "tables", label: "Tables" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function formatPKR(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}
