export interface GalleryImage {
  url: string;
  filename: string;
  uploadedAt: string;
}

export interface GalleryGroup {
  _id: string;
  name: string;
  nameGr: string;
  description: string;
  descriptionGr: string;
  images: GalleryImage[];
}
