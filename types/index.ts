export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  tech: string;
  category: string;
  color: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}