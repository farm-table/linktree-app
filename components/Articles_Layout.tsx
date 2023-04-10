import {
  SimpleGrid,
  Card,
  Heading,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  Button,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Articles_Layout() {
  return (
    <VStack p={20}>
      <Flex>
        <Text fontSize={"2xl"}>Articles</Text>
      </Flex>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <Card>
          <CardHeader>
            <Heading size="md">1 - BrainFriendship NFT</Heading>
          </CardHeader>
          <CardBody>
            <Text>Creating a Friendship NFT contract on Polygon.</Text>
          </CardBody>
          <CardFooter>
            <Button as={Link} href="/articles/1-BrainFriendshipNFT.md">
              View here
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Template</Heading>
          </CardHeader>
          <CardBody>
            <Text>Template</Text>
          </CardBody>
          <CardFooter>
            <Button>template</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </VStack>
  );
}
