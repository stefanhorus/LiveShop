import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL;

if (!saleorApiUrl) {
  console.warn('⚠️ NEXT_PUBLIC_SALEOR_API_URL nu este setată! Folosind URL default.');
}

const httpLink = new HttpLink({
  uri: saleorApiUrl || "https://vercel.saleor.cloud/graphql/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
