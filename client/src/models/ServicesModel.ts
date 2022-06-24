export interface ServicesModel {
  id: number;
  slug: string;
  title: string;
  desc: string;
  values: Array<{ name: string, value: number }>
  content: any;
  articles: Array<{title: string, img: string, desc: string}>
}