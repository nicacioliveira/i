export interface Post {
  slug: string;
  title: string;  // não pode ser undefined
  date: string;   // não pode ser undefined
  content: string; // não pode ser undefined
  description: string | null;  // pode ser null, mas não undefined
  path: string;   // não pode ser undefined
}
