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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  cookieStorageManager,
  Img,
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
  ContractFunctionExecutionError,
  createPublicClient,
  createWalletClient,
  custom,
  getAccount,
  http,
  PublicClient,
  WalletClient,
} from "viem";

import { polygon, polygonMumbai } from "viem/chains";
import {
  BRAINFRIENDNFT_CONTRACT_ADDRESS,
  BRAINFRIENDNFT_CONTRACT_URI,
} from "@/utils/constants";

export default function Linktree_Comp() {
  var walletClient: WalletClient;
  var publicClient: PublicClient;
  var userAcct: Account;
  const [account, setAccount] = useState<Account>();
  const [isMinting, setIsMinting] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Create wallet client
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
  }

  //Create public client
  publicClient = createPublicClient({
    chain: polygon, //polygonMumbai,
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
    isExternal?: boolean;
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
        {...props}
      >
        {props.children}
      </Button>
    );
  };

  const mintFriendship = async () => {
    //Disable button
    setIsMinting(true);

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
        args: [userAcct?.address, BRAINFRIENDNFT_CONTRACT_URI],
        account: userAcct,
      });
      //Attempt to mint
      console.log("Minting to: " + userAcct?.address);
      walletClient
        .writeContract(request)
        .then((receipt) => {
          setIsFriend(true);
          console.log("Transaction Successful: " + receipt);
          onOpen();
        })
        .catch((err) => {
          console.log("Transaction Failed to mint");
        });
    } catch (e: any) {
      if (e.cause && e.cause.name == "ContractFunctionRevertedError") {
        onOpen();
      }
      console.log("Error: " + e.message);
    }

    //Enable minting button
    setIsMinting(false);
  };

  // async function showTotalSupply() {
  //   const data = await publicClient.readContract({
  //     address: BRAINFRIENDNFT_CONTRACT_ADDRESS,
  //     abi: BrainFriendNFT.abi,
  //     functionName: "totalSupply",
  //     args: [],
  //   });

  //   console.log(data);
  // }

  return (
    <VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {!isFriend && (
            <ModalHeader>Nice try pal! We are already friends.</ModalHeader>
          )}
          {isFriend && <ModalHeader>Congrats! We are now friends.</ModalHeader>}
          <ModalCloseButton />
          {isFriend && (
            <ModalBody>
              <Img src="/assets/brainFriendshipnft.png" />
            </ModalBody>
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            isDisabled={isMinting}
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
          <LinkBtn isExternal={true} src="https://graphadvocates.com">
            AdvocatesDAO.com
          </LinkBtn>
          <LinkBtn isExternal={true} src="https://indexerdao.com">
            IndexerDAO.com
          </LinkBtn>
          <LinkBtn isExternal={false} src="/articles">
            Articles
          </LinkBtn>
        </Stack>
      </Box>
    </VStack>
  );
}
