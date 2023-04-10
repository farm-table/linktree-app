import { Flex } from "@chakra-ui/react";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Flex p={10}>
        <main>{children}</main>
      </Flex>
    </>
  );
};

export default Layout;
