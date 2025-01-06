export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  description: string | null;
  path: string;
  category?: string; // opcional
}
