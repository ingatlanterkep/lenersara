// app/blog/page.tsx
import BlogListPage from '@/pages/BlogListPage';

export const metadata = {
  title: 'Blog - Ingatlan hírek és elemzések',
  description: 'Friss hírek és adatvezérelt elemzések a magyar ingatlanpiacról',
};

export default function Page() {
  return <BlogListPage />;
}