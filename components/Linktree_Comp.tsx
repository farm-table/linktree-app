import "viem/window";
import BrainFriendNFT from "../artifacts/BrainFriendNFT.json";
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
  useState,
} from "react";
import {
  Account,
  createPublicClient,
  createWalletClient,
  custom,
  getAccount,
  http,
  PublicClient,
  WalletClient,
} from "viem";

import { polygonMumbai } from "viem/chains";
import { BRAINFRIENDNFT_CONTRACT_ADDRESS } from "@/utils/constants";

export default function Linktree_Comp() {
  var walletClient: WalletClient;
  var publicClient: PublicClient;
  var userAcct: Account;
  const [account, setAccount] = useState<Account>();

  //Create wallet client
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
  }

  //Create public client
  publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  });

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

  interface Props {
    src?: string;
    onClick?: () => void;
  }

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
        onClick={props.onClick}
        isExternal
      >
        {props.children}
      </Button>
    );
  };

  const mintFriendship = async () => {
    try {
      //Get a web3 account
      console.log("logging in...");
      const [address] = await walletClient.requestAddresses();
      userAcct = getAccount(address);
      setAccount(userAcct);
      console.log("Logged in");

      //Simulate contract to see if it executes without error
      const { request } = await publicClient.simulateContract({
        address: BRAINFRIENDNFT_CONTRACT_ADDRESS,
        abi: BrainFriendNFT.abi,
        functionName: "safeMint",
        args: [account?.address],
        account: account,
      });
      //Attempt to mint
      console.log("Minting...");
      await walletClient.writeContract(request);
    } catch (e: any) {
      console.log("Error: " + e.message);
    }
  };

  async function showTotalSupply() {
    const data = await publicClient.readContract({
      address: BRAINFRIENDNFT_CONTRACT_ADDRESS,
      abi: BrainFriendNFT.abi,
      functionName: "totolSupply",
      args: [],
    });

    console.log(data);
  }

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
        <Button onClick={showTotalSupply}>Print Total Supply</Button>
        <Avatar
          size={"xl"}
          src={"/assets/BrainFried.jpg"}
          mb={4}
          pos={"relative"}
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
          <Button
            fontSize={"lg"}
            rounded={"full"}
            bg={useColorModeValue("blue.600", "blue.700")}
            color={"white"}
            boxShadow={useColorModeValue(
              "0px 1px 25px -5px rgb(66 153 240 / 28%), 0 10px 10px -5px rgb(66 153 240 / 23%)",
              ""
            )}
            _hover={{ textDecoration: "none", bg: "blue.900" }}
            onClick={mintFriendship}
          >
            Mint our BrainFriendship{" "}
            <Box p={"2"}>
              <Polygon width={"25"} />
            </Box>
          </Button>
          <LinkBtn src="https://graphadvocates.com">AdvocatesDAO.com</LinkBtn>
          <LinkBtn src="https://indexerdao.com">IndexerDAO.com</LinkBtn>
          <LinkBtn src="#">Articles</LinkBtn>
        </Stack>
      </Box>
    </VStack>
  );
}
