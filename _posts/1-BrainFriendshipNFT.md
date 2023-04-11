---
title: "Creating a Friendship minting Smart Contract on Polygon"
excerpt: "This will be brief outline of the critical steps requried to creating a smart contract on Polygon that issues free NFTs. This is simply a documented learning experience that can shared/referenced for anyone else learning."
coverImage: "/assets/code1bg.jpeg"
date: "2023-04-10T15:00:00.322Z"
author:
  name: BrainFried
  picture: "/assets/BrainFried.jpg"
ogImage:
  url: "/assets/BrainFried.jpg"
---

## Intro

This will be brief outline of the critical steps requried to creating a smart contract on Polygon that issues free NFTs. This is simply a documented learning experience that can shared/referenced for anyone else learning.

_Tools: Viem, NextJS, ChakraUI, OpenZepellin, Remix_

> _Viem will act as our interface to ethereum, an alternate to web3.js or ethers.js. Though it's relatively new, I chose Viem due to it's reported andvantages in both bundle size and performance. You can read more about it [here](https://viem.sh/docs/introduction.html)._

### Front-End

---

1. For most of my development, I've become accustomed to using NextJS (a react framework). To start, we can simply create a next app using `yarn create next-app`

2. Create a button that will trigger an abi call:

```
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
```

_The main things I will focus on is: isMinting, mintFriendship, and the Polygon Icon._

3. Before we can jump into the function itself, we'll need to create some Viem clients that will allow us access to the user's wallet address as well as the smart contract on chain.

- First, we need a walletClient for interacting with the user:
  ```
  var walletClient: WalletClient;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
  }
  ```
  > _At one point, I had an issue with the compiler complaining about "window". To remedy this, I also added `import "viem/window";` to my imports._
- Next, we need a publicClient for interacting with the contract:
  ```
  var publicClient: PublicClient;
  publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });
  ```

4. The mintFriendship will be the function that is called when the button is pressed. Let's define that as follows:

```
const mintFriendship = async () => {
    //Disable button
    setIsMinting(true);

    try {
      //Get a web3 account
      const [address] = await walletClient.requestAddresses();
      userAcct = getAccount(address);

      //Simulate contract to see if it executes without error
      const { request } = await publicClient.simulateContract({
        address: BRAINFRIENDNFT_CONTRACT_ADDRESS,
        abi: BrainFriendNFT.abi,
        functionName: "safeMint",
        args: [userAcct?.address, BRAINFRIENDNFT_CONTRACT_URI],
        account: userAcct,
      });

      //Attempt to mint
      walletClient
        .writeContract(request)
        .then((receipt) => {
          setIsFriend(true);
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
```

Let's step through some of the key points...

- `setIsMinting(true)` sets out local state variable which is initialized to false as follows: `const [isMinting, setIsMinting] = useState(false);`. The state variable will be used to disable our mint button while we are waiting for the user to confirm/deny transactions

- `walletClient.requestAddresses()` will request an address account from the user to connect with this site.

- `publicClient.simulateContract()` will test the interaction with the contract before making a call. The can be used to check for any revert errors. There's more information on this function [here](https://viem.sh/docs/contract/simulateContract.html)

Then we can pass the simulated request into the write function `walletClient.writeContract(request)` to attempt to fulfill the request.

> _I had issues with this function when I tried to run the writeContract() method without first simulating the request. Not sure if I was doing something wrong but nonetheless, it doesn't hurt to simulate first._

The last thing to pay attention to is the `onOpen()` function. This is called in two locations, the first is called if the transaction is successful. The second is called if the contract reverted. Since, I didn't know how to call onOpen on two separate modals, I just created a state variable that lets me set the msg based on which scenario happened. So `setIsFriend(true)` is called if the transaction succeeds, but remains false otherwise. Then modal text can be set something like:

```
{!isFriend && (<ModalHeader>Contract Reverted</ModalHeader>)}
{isFriend && <ModalHeader>Congrats! We are now friends.</ModalHeader>}`
```

### Smart Contract

---

5. Now we can move onto the smart contract. For this, we turn to OpenZeppelin's easy-to-use contract generating [wizard](https://docs.openzeppelin.com/contracts/4.x/wizard) to get us started:

![Contract Wizard](https://brainfried.xyz/assets/OpenZeppelinWizard.png)

6. Create an ERC721 contract with a specified name and symbol.

7. The Base URI is where you'll store the NFT attributes, this will most commonly be on IPFS or some other distributed storage platform. For simplicity, I just used my own web hosting domain: "brainfried.xyz/api" - Will circle back to this in a moment.

8. Set the features you want out of your smart contract. For us, we want it mintable + autoincrement ids, enumerable, and we want to enable URI storage

9. Click "open in remix"

10. Modify the functions. For me, I'd like to add `uint public MAX_SUPPLY = 20000;` to define a max supply of nfts that we can issue.

11. Inside our safeMint function, we can add `require(totalSupply() < MAX_SUPPLY, "I have too many friends");` as well as `require(balanceOf(to) == 0, "We are already friends" );` These will cause the contract to revert with the given msgs.

> _To require funds before minting, you can make the safeMint function "payable", but that won't be covered here since we are minting these for free._

12. If I'm not forgetting anything, that should be all of the modification we need to make on the contract side of things. Now lets compile (ctrl + s). You should see a green check mark indicating that it compiled succesfully.

13. On the left toolbar, click on the bottom icon (Deploy & run transactions)

14. For Environment select "Injected Provider - Metamask". This will select the chain that your metamask is set to. You can switch it to Polygon or mumbai (if you use mumbai, change the publicClient chain to polgonMumbai and import it from viem/chains).

15. Select an account with MATIC, make the correct contract is selected then click "deploy".

16. After the contract is deployed, we need to capture 2 peices of information. We need the contract address and the abi. The address where tell us where to access our functions, the abi will tell us which functions we can access.

17. In the code above, replace `BRAINFRIENDNFT_CONTRACT_ADDRESS` with any new const you want to create. For example, create `const CONTRACT_ADDRESS = "..."` and insert the contract address between the quotes. The replace `BrainFriendNFT.abi` with another new variable as well. For example, `const CONTRACT_ABI = ...` and set it equal to the abi you copied from remix.

18. The last thing you should need is the contract URI. This depends on where you want to store your URI information. For simplicity, I just put it under pages > api > brainFriedNFT.ts and defined the handler function as follows:

```
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "BrainFriendship",
    description:
      "Family comes and goes... A blockchain friendship, that's forever. You're now BrainFried's friend.",
    image: "https://brainfried.xyz/assets/brainFriendshipnft.png",
    external_url: "https://twitter.com/BrainFriedEth",
    attributes: [
      {
        trait_type: "Token",
        value: "Polygon",
      },
      {
        trait_type: "Base",
        value: "Starfish",
      },
    ],
  });
}
```

The attribute formatting is based on Opensea's docs and can be read more about on opensea [docs](https://docs.opensea.io/docs/metadata-standards)

Based on the Opensea formatting, we gave the nft a name of "BrainFriendship" and a description, etc. You'll notice we also defined the image location. The image is located on my web hosting server along with my website's code and such. This means that it's not really an immutable NFT.

If you want to make an immutable image for your users, it more appropriate to store the image on IPFS (or similar) and use the generated storage hash to define where the NFT lives. As goes with the URI attributes (npoint.io was recommended to me), that can be changed anytime I like because they're stored on a server which I control. This is the danger of a centralized NFT, I can add/remove properties as I see fit even though the user may have thought they were purchasing an immutable nft. So in an ideal nft, I would expect that all of this information to be stored immutably somewhere.

Additionally, Opensea offers the ability to freeze metadata through the smart contract as well. It can be read about in opensea [docs](https://docs.opensea.io/docs/metadata-standards#freezing-metadata)

### Conclusion

---

After you have created a button, connected that button to a function then created/deployed a smart contract and connected to the contract address and abi. Then running the app with `yarn dev`, you should be able to click your button and it will step through the process of creating your first smart contract. Congratulations!
