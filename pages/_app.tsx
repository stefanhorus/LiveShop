import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react';
import client from "../lib/graphql";
import Layout from "../components/Layout";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
