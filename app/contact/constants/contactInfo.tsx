import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string[];
}

export const contactInfoData: ContactInfoItem[] = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'contact.address',
    content: ['123 Industrial Street', 'Athens, Greece', '10431'],
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'contact.phone',
    content: ['+30 210 123 4567', '+30 694 567 8901'],
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'contact.email',
    content: ['info@tzoliswelding.gr', 'projects@tzoliswelding.gr'],
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Business Hours',
    content: [
      'Monday - Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 3:00 PM',
      'Sunday: Emergency Only',
    ],
  },
];
