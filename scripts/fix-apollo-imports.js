const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../generated/graphql.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Check if imports are already there
if (!content.includes('ApolloReactHooks')) {
  // Add imports after line 2
  content = content.replace(
    'import * as Apollo from \'@apollo/client\';',
    `import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
import { skipToken, type SkipToken } from '@apollo/client/react';`
  );
}

// Replace all Apollo.* references with ApolloReactHooks.*
const replacements = [
  { from: /Apollo\.QueryHookOptions/g, to: 'ApolloReactHooks.QueryHookOptions' },
  { from: /Apollo\.LazyQueryHookOptions/g, to: 'ApolloReactHooks.LazyQueryHookOptions' },
  { from: /Apollo\.SuspenseQueryHookOptions/g, to: 'ApolloReactHooks.SuspenseQueryHookOptions' },
  { from: /Apollo\.UseSuspenseQueryResult/g, to: 'ApolloReactHooks.UseSuspenseQueryResult' },
  { from: /Apollo\.QueryResult/g, to: 'ApolloReactHooks.QueryResult' },
  { from: /Apollo\.useQuery/g, to: 'ApolloReactHooks.useQuery' },
  { from: /Apollo\.useLazyQuery/g, to: 'ApolloReactHooks.useLazyQuery' },
  { from: /Apollo\.useSuspenseQuery/g, to: 'ApolloReactHooks.useSuspenseQuery' },
  { from: /Apollo\.skipToken/g, to: 'skipToken' },
  { from: /Apollo\.SkipToken/g, to: 'SkipToken' },
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed Apollo Client imports in generated/graphql.tsx');
