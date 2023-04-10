import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import { Text, SimpleGrid } from "@chakra-ui/react";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <Text fontSize={"xl"} fontWeight={800} p={10} pb={5} textAlign={"center"}>
        Articles
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="10px" p={5}>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </SimpleGrid>
    </section>
  );
};

export default MoreStories;
