// import cn from 'classnames'
import Link from "next/link";
import { Box, Image } from "@chakra-ui/react";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      // className={cn('shadow-sm w-full', {
      //   'hover:shadow-lg transition-shadow duration-200': slug,
      // })}
      width={"full"}
      height={250}
    />
  );
  return (
    <Box overflow={"hidden"} borderTopRadius={"2xl"}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  );
};

export default CoverImage;
