import { MoonIcon } from "@chakra-ui/icons";
import { BiHomeHeart, BiAlarm } from "react-icons/bi";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <IconButton
        variant={"ghost"}
        aria-label="Toggle Dark Mode"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
      />
      <IconButton
        as={Link}
        href={"/"}
        variant={"ghost"}
        aria-label="Go Home"
        icon={<BiHomeHeart />}
      />
    </Flex>
  );
}
