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
        quantityAvailable
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
    products(first: 20, channel: $channel, filter: {search: $query}) {
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

export const TokenCreate = gql`
  mutation TokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        field
        message
      }
    }
  }
`;

export const AccountRegister = gql`
  mutation AccountRegister($email: String!, $password: String!, $firstName: String, $lastName: String) {
    accountRegister(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        field
        message
      }
    }
  }
`;

export const Me = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      dateJoined
    }
  }
`;

export const Orders = gql`
  query Orders($first: Int!) {
    me {
      orders(first: $first) {
        edges {
          node {
            id
            number
            created
            status
            total {
              gross {
                amount
                currency
              }
            }
            lines {
              id
              productName
              quantity
              variantName
            }
          }
        }
      }
    }
  }
`;
