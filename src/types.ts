export interface Project {
  id: string;
  title: string;
  category: string; // 'Web Design' | 'UI/UX' | 'Dev' 
  description: string;
  imageUrl: string;
  liveLink: string;
  isPublic: boolean;
  dateAdded: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string; // e.g. Frontend Engineering, 3D Graphics, Visual Architecture, Backend Systems, Utility Framework, Video Editing, Typed Logic, General
  proficiency: number; // 0 - 100
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // e.g. 'web', 'terminal', 'draw', 'devices', 'brush', 'cloud', 'code', 'bolt', 'star', 'videocam', 'monitoring'
  tags: string[];
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  rating: number; // 1-5
  quote: string;
  status: 'Approved' | 'Pending' | 'Draft';
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isNew: boolean;
  replies: string[];
  avatarSeed: string;
}

export interface Profile {
  fullName: string;
  professionalTitle: string;
  bio: string;
  emailAddress: string;
  location: string;
  phone: string;
  avatarUrl: string;
}

export interface SocialLinks {
  linkedIn: string;
  github: string;
  Facebook: string;
  instagram: string;
  youtube: string;
}
