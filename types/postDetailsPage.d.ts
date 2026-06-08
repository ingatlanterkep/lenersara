// types/postDetailsPage.d.ts
declare module '@/pages/PostDetailsPage' {
  interface PostDetailsPageProps {
    cookiesAccepted?: boolean;
    cookiesDecided?: boolean;
    onLeadEvent?: (type: string, postId: string) => void;
  }
  
  const PostDetailsPage: React.FC<PostDetailsPageProps>;
  export default PostDetailsPage;
}