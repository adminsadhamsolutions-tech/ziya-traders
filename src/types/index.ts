export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  category_id: string;
  status: 'active' | 'inactive';
  sort_order: number;
  created_at: string;
  category?: Category;
  product_images?: ProductImage[];
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type InspectionStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

export type InspectionRequest = {
  id: string;
  client_name: string;
  company: string | null;
  country: string | null;
  phone: string;
  email: string;
  stone_type: string | null;
  quantity: string | null;
  message: string | null;
  status: InspectionStatus;
  is_read: boolean;
  created_at: string;
};

export type SiteSettings = {
  company_name: string;
  owner: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  logo_url: string;
  hero_image_url: string;
  about: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};
