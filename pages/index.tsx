import Head from "next/head";
import Linktree_Comp from "../components/Linktree_Comp";

export default function Home() {
  return (
    <>
      <Head>
        <title>BrainFried</title>
        <meta name="description" content="You shouldn't be here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Linktree_Comp />
    </>
  );
}
