import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Button,
  HStack,
  Img,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { MoonIcon } from "@chakra-ui/icons";
import Linktree_Comp from "../components/Linktree_Comp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>BrainFried</title>
        <meta name="description" content="You shouldn't be here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IconButton
        variant={"ghost"}
        aria-label="Toggle Dark Mode"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
      />
      <Linktree_Comp />
    </>
  );
}
