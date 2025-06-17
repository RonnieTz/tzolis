import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import React from 'react';

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string | string[];
}

export const contactInfoData: ContactInfoItem[] = [
  {
    icon: React.createElement(Phone, { size: 24 }),
    title: 'contact.phone',
    content: ['+30 22310 81394', '+30 6937144085'],
  },
  {
    icon: React.createElement(Mail, { size: 24 }),
    title: 'contact.email',
    content: ['info@tzolis.gr', 'contact@tzolis.gr'],
  },
  {
    icon: React.createElement(MapPin, { size: 24 }),
    title: 'contact.address',
    content: 'address',
  },
  {
    icon: React.createElement(Clock, { size: 24 }),
    title: 'contact.businessHours',
    content: 'businessHours',
  },
];
