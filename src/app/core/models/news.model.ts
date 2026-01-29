export interface News {
  id?: string;          // Firebase ID
  slug: string;         // "were-working-with-safety"
  title: string;
  category: 'Blog' | 'Commercial' | 'Safety' | 'Expo' | 'Colors' | 'Technical Information';
  author: string;
  date: string;         // ISO string o yyyy-mm-dd
  excerpt: string;      // Texto corto (listado)
  content: string;      // Texto largo (detalle)
  image: string[];        // URL
  featured?: boolean;   // Para destacar
}