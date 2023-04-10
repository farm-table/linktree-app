import Articles_Layout from "../../components/Articles_Layout";
import Post from "@/interfaces/post";
import { getAllPosts } from "../api/api";
import MoreStories from "@/components/more-stories";

type Props = {
  allPosts: Post[];
};
export default function articles({ allPosts }: Props) {
  const morePosts = allPosts;
  return <>{morePosts.length > 0 && <MoreStories posts={morePosts} />}</>;
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
