import { gql } from '@apollo/client';

export const AllProducts = gql`
  query AllProducts {
    products(first: 100, channel: "default-channel") {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            url
            alt
          }
          category {
            id
            name
            slug
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Categories = gql`
  query Categories {
    categories(first: 10) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const ProductDetails = gql`
  query ProductDetails($id: ID!, $channel: String!) {
    product(id: $id, channel: $channel) {
      id
      name
      description
      slug
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
      images {
        id
        url
        alt
      }
      category {
        id
        name
        slug
      }
    }
  }
`;
