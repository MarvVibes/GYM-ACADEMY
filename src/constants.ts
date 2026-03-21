import { Trainer, ClassSession, Testimonial, PricingTier } from './types';

export const TRAINERS: Trainer[] = [
  {
    id: '1',
    name: 'Marcus Vane',
    role: 'Master Personal Trainer',
    bio: 'Specializing in high-intensity functional training and metabolic conditioning. Marcus has spent 15 years crafting professional athlete programs.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Elena Kostic',
    role: 'Nutrition Specialist',
    bio: 'Integrating molecular nutrition with precision weightlifting for total body recomposition. Her data-driven approach yields clinical results.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'David Thorne',
    role: 'Strength & Conditioning',
    bio: 'Former tactical strength coach for elite special forces. Thorne focuses on raw power and mental resilience under heavy loads.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Sasha Grey',
    role: 'Mobility Expert',
    bio: 'Bridging the gap between explosive power and kinetic flow. Sasha’s methodology prevents injury while maximizing range of motion.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Jordan Reed',
    role: 'Performance Coach',
    bio: 'Expert in vertical jump mechanics and sprint speed development. Reed transforms amateur effort into professional-grade velocity.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Leo Santos',
    role: 'Combat Sports Trainer',
    bio: 'Mastering the art of fighting fit. Leo combines traditional pugilism with modern metabolic stress testing for peak readiness.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop'
  }
];

export const SCHEDULE: ClassSession[] = [
  {
    id: '1',
    title: 'HIIT Burn',
    type: 'HIIT',
    kcal: '450 kcal est.',
    time: '08:00 AM - 09:00 AM',
    trainer: 'Marcus Vane',
    trainerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
    intensity: 'Intermediate'
  },
  {
    id: '2',
    title: 'Strength 101',
    type: 'Strength',
    kcal: '300 kcal est.',
    time: '10:30 AM - 11:30 AM',
    trainer: 'David Thorne',
    trainerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    intensity: 'Beginner'
  },
  {
    id: '3',
    title: 'Power Flow',
    type: 'Yoga',
    kcal: '200 kcal est.',
    time: '12:00 PM - 01:00 PM',
    trainer: 'Sasha Grey',
    trainerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    intensity: 'Beginner'
  },
  {
    id: '4',
    title: 'Gloves Off',
    type: 'Boxing',
    kcal: '500 kcal est.',
    time: '05:00 PM - 06:00 PM',
    trainer: 'Leo Santos',
    trainerImage: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    intensity: 'Advanced'
  },
  {
    id: '5',
    title: 'Elite HIIT',
    type: 'HIIT',
    kcal: '600 kcal est.',
    time: '06:30 PM - 07:30 PM',
    trainer: 'Marcus Vane',
    trainerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
    intensity: 'Advanced'
  },
  {
    id: '6',
    title: 'Iron Core',
    type: 'Strength',
    kcal: '400 kcal est.',
    time: '09:00 AM - 10:00 AM',
    trainer: 'David Thorne',
    trainerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=400&auto=format&fit=crop',
    intensity: 'Intermediate'
  },
  {
    id: '7',
    title: 'Zen Master',
    type: 'Yoga',
    kcal: '150 kcal est.',
    time: '07:00 AM - 08:00 AM',
    trainer: 'Sasha Grey',
    trainerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop',
    intensity: 'Intermediate'
  },
  {
    id: '8',
    title: 'Ring Ready',
    type: 'Boxing',
    kcal: '450 kcal est.',
    time: '04:00 PM - 05:00 PM',
    trainer: 'Leo Santos',
    trainerImage: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&auto=format&fit=crop',
    intensity: 'Intermediate'
  },
  {
    id: '9',
    title: 'HIIT Foundation',
    type: 'HIIT',
    kcal: '350 kcal est.',
    time: '07:00 AM - 08:00 AM',
    trainer: 'Marcus Vane',
    trainerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
    intensity: 'Beginner'
  },
  {
    id: '10',
    title: 'Power Lifting',
    type: 'Strength',
    kcal: '450 kcal est.',
    time: '04:00 PM - 05:30 PM',
    trainer: 'David Thorne',
    trainerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
    intensity: 'Advanced'
  },
  {
    id: '11',
    title: 'Advanced Vinyasa',
    type: 'Yoga',
    kcal: '250 kcal est.',
    time: '07:30 PM - 08:30 PM',
    trainer: 'Sasha Grey',
    trainerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    intensity: 'Advanced'
  },
  {
    id: '12',
    title: 'Boxing Basics',
    type: 'Boxing',
    kcal: '350 kcal est.',
    time: '03:00 PM - 04:00 PM',
    trainer: 'Leo Santos',
    trainerImage: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&auto=format&fit=crop',
    intensity: 'Beginner'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Thorne',
    role: 'Member since 2022',
    content: '"The precision of the training here is unlike anything I\'ve experienced. It\'s not just a gym; it\'s a performance lab."',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Elena Vance',
    role: 'Marathon Runner',
    content: '"GYM ACADEMY provided the missing piece in my professional athletic journey. The recovery tech is second to none."',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Julian Cross',
    role: 'Weightlifter',
    content: '"The community of high-performers keeps you accountable. Every session feels like a push toward something greater."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

export const PRICING: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$49',
    features: [
      '24/7 Access to Academy Floors',
      'Basic Recovery Suite Access',
      'Digital Workout Tracking'
    ],
    notIncluded: [
      'Personal Training Sessions'
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    price: '$89',
    features: [
      'Unlimited Multi-Academy Access',
      '1 Personal Training Session/mo',
      'Custom Nutrition Programming',
      'Advanced Biometric Analysis',
      'Priority Class Booking'
    ],
    popular: true
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$149',
    features: [
      'Full Global Access & VIP Lounge',
      'Weekly 1-on-1 Coaching',
      'Hyperbaric & Cryo Suite Access',
      'Academy Gear Pack Monthly'
    ]
  }
];
