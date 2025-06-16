import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: string[] | 'address';
}

export const contactInfoData: ContactInfoItem[] = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'contact.address',
    content: 'address', // Special marker for dynamic address content
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'contact.phone',
    content: ['+30 22310 81394', '+30 6837144985'],
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'contact.email',
    content: ['leotzolis@gmail.com'],
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
