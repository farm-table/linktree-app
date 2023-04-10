// import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import { Box, Text, Avatar, VStack } from "@chakra-ui/react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box m={4} p={4} bg={"gray.600"} borderRadius={"2xl"}>
      <CoverImage slug={slug} title={title} src={coverImage} />
      <VStack align={"left"}>
        <Text
          fontSize={"md"}
          fontWeight={700}
          textDecoration={"underline"}
          p={2}
          pl={0}
        >
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            {title}
          </Link>
        </Text>
        <Box as={"i"}>
          <DateFormatter dateString={date} />
        </Box>
        <Text as={"cite"} noOfLines={5}>
          {excerpt}
        </Text>
        <Avatar name={author.name} src={author.picture} />
      </VStack>
    </Box>
  );
};

export default PostPreview;
