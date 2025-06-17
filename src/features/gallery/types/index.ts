export interface GalleryGroup {
  _id: string;
  name: string;
  nameGr: string;
  description: string;
  descriptionGr: string;
  images: GalleryImage[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  url: string;
  filename: string;
  uploadedAt: Date;
}
