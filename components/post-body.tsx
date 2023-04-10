import { Flex } from "@chakra-ui/react";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <Flex p={4} bg={"gray.900"} borderRadius={"2xl"}>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Flex>
  );
};

export default PostBody;
