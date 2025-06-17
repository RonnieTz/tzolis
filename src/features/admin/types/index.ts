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

export interface NewGroupForm {
  name: string;
  nameGr: string;
  description: string;
  descriptionGr: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
