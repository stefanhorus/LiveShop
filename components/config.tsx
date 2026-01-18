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
          description
          backgroundImage {
            url
          }
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
      seoDescription
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
        onSale
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
      attributes {
        attribute {
          id
          name
        }
        values {
          id
          name
        }
      }
      variants {
        id
        name
        sku
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
        quantityAvailable
        attributes {
          attribute {
            id
            name
          }
          values {
            id
            name
          }
        }
      }
    }
  }
`;

export const SimilarProducts = gql`
  query SimilarProducts($categoryId: ID!, $channel: String!) {
    category(id: $categoryId) {
      products(first: 4, channel: $channel) {
        edges {
          node {
            id
            name
            slug
            thumbnail {
              url
              alt
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
  }
`;

export const SearchProducts = gql`
  query SearchProducts($query: String!, $channel: String!) {
    products(first: 20, channel: $channel, filter: { search: $query }) {
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
