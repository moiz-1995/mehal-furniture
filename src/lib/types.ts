import type { CategoryId } from "./site";

/** Which 3D base in the studio a catalogue piece can be customised from. */
export type DesignBase = "sofa" | "bed" | "table";

export interface MaterialLine {
  /** The part of the piece, e.g. "Frame" or "Upholstery". */
  part: string;
  /** What that part is made of, e.g. "Seasoned sheesham". */
  material: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  summary: string;
  description: string;
  materials: MaterialLine[];
  /** Starting price in PKR. Empty means "ask for price". */
  priceFrom?: number;
  leadTimeWeeks?: number;
  images: string[];
  designBase?: DesignBase;
  featured: boolean;
  /** Seeded placeholder the owner should replace. */
  sample?: boolean;
  createdAt: string;
}

export type RequestStatus = "new" | "quoted" | "making" | "delivered";

export interface DesignRequest {
  id: string;
  createdAt: string;
  kind: "3d" | "photo" | "inspiration" | "piece";
  name: string;
  phone: string;
  note?: string;
  /** Human-readable summary of the chosen options. */
  summary: string[];
  image?: string;
  productSlug?: string;
  status: RequestStatus;
}

export interface Database {
  products: Product[];
  requests: DesignRequest[];
}
