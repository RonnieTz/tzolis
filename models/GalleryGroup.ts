import mongoose from 'mongoose';

const GalleryGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    nameGr: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    descriptionGr: {
      type: String,
      default: '',
    },
    images: [
      {
        url: String,
        filename: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GalleryGroup ||
  mongoose.model('GalleryGroup', GalleryGroupSchema);
