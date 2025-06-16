import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        gallery: 'Gallery',
        contact: 'Contact',
        admin: 'Admin',
        login: 'Login',
      },
      home: {
        title: 'Welding & Metal Fabrication',
        subtitle: 'Professional Welding Services in Lamia',
        description:
          'Expert welding and metal fabrication services for industrial, commercial, and residential projects.',
        cta: 'Get Quote',
        ctaSection: {
          title: 'Ready to Start Your Project?',
          subtitle: 'Contact us today for a free consultation and quote',
        },
      },
      about: {
        title: 'About Us',
        description:
          'We are a leading welding and metal fabrication company in Greece with over 20 years of experience.',
        services: 'Our Services',
        servicesDescription:
          'We provide comprehensive welding and metal fabrication services with over 20 years of expertise in the industry.',
        servicesList: {
          structural: 'Structural Welding',
          fabrication: 'Metal Fabrication',
          repair: 'Repair Services',
          custom: 'Custom Projects',
        },
        servicesDescriptions: {
          structural:
            'Professional structural welding for construction projects, ensuring safety and durability with certified welders.',
          fabrication:
            'Custom metal fabrication services for industrial, commercial, and residential applications.',
          repair:
            'Expert repair and maintenance services for metal structures, machinery, and equipment.',
          custom:
            'Tailored welding solutions designed to meet your specific project requirements.',
        },
        featuresDescriptions: {
          structural:
            'High-quality structural welding for construction projects',
          fabrication: 'Custom metal fabrication solutions',
          repair: 'Professional repair and maintenance services',
          custom: 'Tailored solutions for unique requirements',
        },
        stats: {
          experience: 'Years Experience',
          projects: 'Projects Completed',
          satisfaction: 'Customer Satisfaction',
          emergency: 'Emergency Service',
        },
        commitment: {
          title: 'Our Commitment to Excellence',
          quality: {
            title: 'Quality Assurance',
            description:
              'Every project undergoes rigorous quality checks to ensure the highest standards of workmanship.',
          },
          certified: {
            title: 'Certified Professionals',
            description:
              'Our team consists of certified welders and metal fabricators with extensive industry experience.',
          },
          customer: {
            title: 'Customer Focus',
            description:
              'We work closely with our clients to deliver customized solutions that meet their specific needs.',
          },
        },
        whyChoose: {
          title: 'Why Choose Tzolis Welding?',
          points: {
            experience: 'Over 20 years of industry experience',
            equipment: 'State-of-the-art welding equipment',
            pricing: 'Competitive pricing with no hidden costs',
            emergency: '24/7 emergency repair services',
            insured: 'Fully insured and licensed',
            consultation: 'Free consultations and quotes',
          },
        },
      },
      gallery: {
        title: 'Our Work',
        noImages: 'No images in this gallery yet.',
      },
      contact: {
        title: 'Contact Us',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        name: 'Name',
        message: 'Message',
        send: 'Send Message',
      },
      login: {
        title: 'Admin Login',
        username: 'Username',
        password: 'Password',
        submit: 'Login',
        error: 'Invalid credentials',
      },
      admin: {
        title: 'Admin Panel',
        galleries: 'Gallery Groups',
        createGroup: 'Create New Group',
        deleteGroup: 'Delete Group',
        addImages: 'Add Images',
        groupName: 'Group Name',
        logout: 'Logout',
      },
    },
  },
  gr: {
    translation: {
      nav: {
        home: 'Αρχική',
        about: 'Σχετικά',
        gallery: 'Συλλογή',
        contact: 'Επικοινωνία',
        admin: 'Διαχείριση',
        login: 'Σύνδεση',
      },
      home: {
        title: 'Ηλεκτροσυγκολλήσεις & Κατασκευές Μετάλλου',
        subtitle: 'Επαγγελματικές Υπηρεσίες Συγκόλλησης στη Λαμία',
        description:
          'Εξειδικευμένες υπηρεσίες συγκόλλησης και κατασκευών μετάλλου για βιομηχανικά, εμπορικά και οικιστικά έργα.',
        cta: 'Ζητήστε Προσφορά',
        ctaSection: {
          title: 'Έτοιμοι να Ξεκινήσετε το Έργο σας;',
          subtitle:
            'Επικοινωνήστε μαζί μας σήμερα για δωρεάν συμβουλή και προσφορά',
        },
      },
      about: {
        title: 'Σχετικά με εμάς',
        description:
          'Είμαστε μια εταιρεία συγκόλλησης και κατασκευών μετάλλου στην Ελλάδα με πάνω από 20 χρόνια εμπειρίας.',
        services: 'Οι Υπηρεσίες μας',
        servicesDescription:
          'Παρέχουμε ολοκληρωμένες υπηρεσίες συγκόλλησης και κατασκευών μετάλλου με πάνω από 20 χρόνια εμπειρίας στον κλάδο.',
        servicesList: {
          structural: 'Ηλεκτροσυγκολλήσεις παντός τύπου',
          fabrication: 'Κατασκευές Μετάλλου',
          repair: 'Υπηρεσίες Επισκευής',
          custom: 'Προσαρμοσμένα Έργα',
        },
        servicesDescriptions: {
          structural:
            'Επαγγελματική δομική συγκόλληση για κατασκευαστικά έργα, εξασφαλίζοντας ασφάλεια και ανθεκτικότητα με πιστοποιημένους συγκολλητές.',
          fabrication:
            'Προσαρμοσμένες υπηρεσίες κατασκευής μετάλλου για βιομηχανικές, εμπορικές και οικιστικές εφαρμογές.',
          repair:
            'Εξειδικευμένες υπηρεσίες επισκευής και συντήρησης για μεταλλικές κατασκευές, μηχανήματα και εξοπλισμό.',
          custom:
            'Προσαρμοσμένες λύσεις συγκόλλησης σχεδιασμένες για να καλύπτουν τις συγκεκριμένες απαιτήσεις του έργου σας.',
        },
        featuresDescriptions: {
          structural:
            'Υψηλής ποιότητας ηλεκτροσυγκολλήσεις για κατασκευαστικά έργα',
          fabrication: 'Προσαρμοσμένες λύσεις κατασκευής μετάλλου',
          repair: 'Επαγγελματικές υπηρεσίες επισκευής και συντήρησης',
          custom: 'Προσαρμοσμένες λύσεις για μοναδικές απαιτήσεις',
        },
        stats: {
          experience: 'Χρόνια Εμπειρίας',
          projects: 'Ολοκληρωμένα Έργα',
          satisfaction: 'Ικανοποίηση Πελατών',
          emergency: 'Υπηρεσία Έκτακτης Ανάγκης',
        },
        commitment: {
          title: 'Η Δέσμευσή μας για Αριστεία',
          quality: {
            title: 'Διασφάλιση Ποιότητας',
            description:
              'Κάθε έργο υπόκειται σε αυστηρούς ελέγχους ποιότητας για να εξασφαλίσει τα υψηλότερα στάνταρ εργασίας.',
          },
          certified: {
            title: 'Πιστοποιημένοι Επαγγελματίες',
            description:
              'Η ομάδα μας αποτελείται από πιστοποιημένους συγκολλητές και κατασκευαστές μετάλλου με εκτενή εμπειρία στον κλάδο.',
          },
          customer: {
            title: 'Εστίαση στον Πελάτη',
            description:
              'Συνεργαζόμαστε στενά με τους πελάτες μας για να παραδώσουμε εξειδικευμένες λύσεις που καλύπτουν τις συγκεκριμένες τους ανάγκες.',
          },
        },
        whyChoose: {
          title: 'Γιατί να μας επιλέξετε;',
          points: {
            experience: 'Πάνω από 20 χρόνια εμπειρίας στον κλάδο',
            equipment: 'Υπερσύγχρονος εξοπλισμός συγκόλλησης',
            pricing: 'Ανταγωνιστικές τιμές χωρίς κρυφό κόστος',
            emergency: 'Υπηρεσίες επισκευής έκτακτης ανάγκης 24/7',
            insured: 'Πλήρως ασφαλισμένη και αδειοδοτημένη',
            consultation: 'Δωρεάν συμβουλές και προσφορές',
          },
        },
      },
      gallery: {
        title: 'Η Δουλειά μας',
        noImages: 'Δεν υπάρχουν εικόνες σε αυτή τη συλλογή ακόμα.',
      },
      contact: {
        title: 'Επικοινωνήστε μαζί μας',
        address: 'Διεύθυνση',
        phone: 'Τηλέφωνο',
        email: 'Email',
        name: 'Όνομα',
        message: 'Μήνυμα',
        send: 'Αποστολή Μηνύματος',
      },
      login: {
        title: 'Σύνδεση Διαχειριστή',
        username: 'Όνομα Χρήστη',
        password: 'Κωδικός',
        submit: 'Σύνδεση',
        error: 'Λάθος στοιχεία',
      },
      admin: {
        title: 'Πίνακας Διαχείρισης',
        galleries: 'Ομάδες Συλλογής',
        createGroup: 'Δημιουργία Νέας Ομάδας',
        deleteGroup: 'Διαγραφή Ομάδας',
        addImages: 'Προσθήκη Εικόνων',
        groupName: 'Όνομα Ομάδας',
        logout: 'Αποσύνδεση',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'gr',
  fallbackLng: 'gr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
