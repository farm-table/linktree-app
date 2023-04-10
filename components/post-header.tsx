import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import type Author from "../interfaces/author";
import { Avatar, Box, Center, Flex, Text, VStack } from "@chakra-ui/react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <CoverImage title={title} src={coverImage} />

      <VStack align={"left"}>
        <Text
          align={"center"}
          as={"samp"}
          textDecoration={"underline"}
          fontWeight={800}
          fontSize={"2xl"}
          p={4}
        >
          {title}
        </Text>
      </VStack>

      <div>
        <Flex p={4}>
          <Avatar name={author.name} src={author.picture} />
          <Center p={2}>{author.name}</Center>
        </Flex>

        <Text as={"i"} pl={4}>
          <DateFormatter dateString={date} />
        </Text>
      </div>
    </>
  );
};

export default PostHeader;
