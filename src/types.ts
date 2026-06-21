export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  reviewText: string;
  proofImageUrl: string;
  earningAmount: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BonusItem {
  id: string;
  title: string;
  description: string;
  value: number;
}

export interface PageContent {
  businessName: string;
  trainerName: string;
  trainerTitle: string;
  trainerAvatar: string;
  trainerExperience: string;
  trainerBio: string;
  
  headline: string;
  subHeadline: string;
  videoUrl: string; // YouTube/Vimeo embed or custom MP4 URL
  usePlaceholderVideo: boolean;
  
  webinarPrice: number;
  originalPrice: number;
  currencySymbol: string;
  ctaText: string;
  
  language: string;
  duration: string;
  dateTime: string; // e.g. "Live This Saturday at 4 PM"
  
  whatsappSupportNumber: string;
  upiId: string;
  payeeName: string;
  
  perks: string[];
  painPoints: string[];
  facelessSteps: { title: string; desc: string; icon: string }[];
  
  earningProofs: { id: string; title: string; imgUrl: string; description: string }[];
  testimonials: Testimonial[];
  bonuses: BonusItem[];
  faqs: FAQItem[];
}
