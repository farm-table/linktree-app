import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  ComponentWithAs,
  Flex,
  VStack,
  keyframes,
  Link,
  LinkProps,
  Heading,
  Center,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  HStack,
  IconButton,
  background,
  textDecoration,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Polygon } from "@thirdweb-dev/chain-icons";

import {
  PropsWithChildren,
  ReactComponentElement,
  ReactElement,
  ReactNode,
} from "react";

export default function Linktree_Comp() {
  const size = "96px";
  const color = "teal";

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  type Props = {
    src?: string;
    onClick?: () => void;
    icon?: ReactElement;
  };

  const LinkBtn = (props: PropsWithChildren<Props>) => {
    return (
      <Button
        as={Link}
        fontSize={"lg"}
        rounded={"full"}
        bg={useColorModeValue("blue.600", "blue.700")}
        color={"white"}
        boxShadow={useColorModeValue(
          "0px 1px 25px -5px rgb(66 153 240 / 28%), 0 10px 10px -5px rgb(66 153 240 / 23%)",
          ""
        )}
        _hover={{ textDecoration: "none", bg: "blue.900" }}
        href={props.src}
        leftIcon={props.icon}
        onClick={props.onClick}
        isExternal
      >
        {props.children}
      </Button>
    );
  };

  return (
    <VStack>
      <Box
        maxW={"400px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={"/assets/BrainFried.jpg"}
          mb={4}
          pos={"relative"}
          // _after={{
          //   content: '""',
          //   w: 4,
          //   h: 4,
          //   bg: "green.300",
          //   border: "2px solid white",
          //   rounded: "full",
          //   pos: "absolute",
          //   bottom: 0,
          //   right: 0,
          // }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Brain Fried
        </Heading>
        <HStack justify={"center"} p={"1"}>
          <IconButton
            as={Link}
            aria-label="twitter link"
            href={"https://twitter.com/BrainFriedEth"}
            icon={<FaTwitter />}
            bg={useColorModeValue("whiteAlpha.900", "gray.600")}
            isExternal
          />
          <IconButton
            as={Link}
            aria-label="Youtube link"
            href={"https://www.youtube.com/channel/UCxrVlwiCNG3fKEcrVo0Nyyw"}
            icon={<FaYoutube />}
            bg={useColorModeValue("whiteAlpha.900", "gray.600")}
            isExternal
          />
        </HStack>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
          fontSize={"md"}
        >
          Developer, Collaborator, Dreamer
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Engineering
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Music
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #Ideas
          </Badge>
        </Stack>

        <Stack mt={8} direction={"column"} spacing={"4"}>
          <LinkBtn>
            Mint our BrainFriendship{" "}
            <Box p={"2"}>
              <Polygon width={"25"} />
            </Box>
          </LinkBtn>
          <LinkBtn src="https://advocatesdao.com">AdvocatesDAO.com</LinkBtn>
          <LinkBtn src="https://indexerdao.com">IndexerDAO.com</LinkBtn>
          <LinkBtn src="#">Articles</LinkBtn>
        </Stack>
      </Box>
    </VStack>
  );
}
