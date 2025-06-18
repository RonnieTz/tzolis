import mongoose from 'mongoose';

const BusinessHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  openTime: {
    type: String,
    default: '09:00',
  },
  closeTime: {
    type: String,
    default: '17:00',
  },
  specialNote: {
    type: String,
    default: '',
  },
});

interface IBusinessSettings {
  businessHours: Array<{
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
    specialNote: string;
  }>;
  phone: string[];
  email: string[];
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  lastUpdated: Date;
}

interface IBusinessSettingsModel extends mongoose.Model<IBusinessSettings> {
  getSettings(): Promise<IBusinessSettings>;
}

const BusinessSettingsSchema = new mongoose.Schema(
  {
    businessHours: [BusinessHoursSchema],
    phone: {
      type: [String],
      default: ['+30 22310 81394', '+30 6937144085'],
    },
    email: {
      type: [String],
      default: ['contact@tzolis.gr'],
    },
    address: {
      line1: { type: String, default: 'Moshohori' },
      line2: { type: String, default: 'Lamia, Greece' },
      line3: { type: String, default: '35100' },
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one settings document exists
BusinessSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();

  if (!settings) {
    // Create default settings
    const defaultHours = [
      { day: 'monday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
      { day: 'tuesday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
      { day: 'wednesday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
      { day: 'thursday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
      { day: 'friday', isOpen: true, openTime: '08:00', closeTime: '18:00' },
      { day: 'saturday', isOpen: true, openTime: '09:00', closeTime: '15:00' },
      {
        day: 'sunday',
        isOpen: false,
        openTime: '',
        closeTime: '',
        specialNote: 'Emergency Only',
      },
    ];

    settings = new this({
      businessHours: defaultHours,
    });

    await settings.save();
  }

  return settings;
};

export default (mongoose.models.BusinessSettings as IBusinessSettingsModel) ||
  mongoose.model<IBusinessSettings, IBusinessSettingsModel>(
    'BusinessSettings',
    BusinessSettingsSchema
  );
