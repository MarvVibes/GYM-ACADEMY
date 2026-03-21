export type Screen = 'home' | 'booking' | 'contact' | 'success' | 'trainers' | 'membership' | 'schedule' | 'about' | 'bookings' | 'admin';

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ClassSession {
  id: string;
  title: string;
  type: string;
  kcal: string;
  time: string;
  trainer: string;
  trainerImage: string;
  image: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  memberSince?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'admin';
  membership?: string;
  membershipId?: string;
  membershipStatus?: 'active' | 'inactive' | 'pending';
  createdAt: number;
  updatedAt?: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  discipline: string;
  instructor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: number;
}

export interface Membership {
  id: string;
  userId: string;
  tierId: string;
  tierName: string;
  price: string;
  status: 'active' | 'inactive' | 'pending';
  startDate: number;
  endDate?: number;
  nextBillingDate?: number;
  createdAt: number;
}
