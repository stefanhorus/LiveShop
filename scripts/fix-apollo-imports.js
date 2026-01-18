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
import { skipToken } from '@apollo/client/react';
type SkipToken = typeof skipToken;

// Type alias for MutationFunction (not exported in Apollo Client v4)
type MutationFunction<TData, TVariables> = (variables?: TVariables) => Promise<{ data?: TData; errors?: any }>;`
  );
}

    // Replace all Apollo.* references with ApolloReactHooks.* or direct imports
    // Order matters - do specific patterns first
    const replacements = [
      { from: /Apollo\.QueryHookOptions/g, to: 'ApolloReactHooks.QueryHookOptions' },
      { from: /Apollo\.LazyQueryHookOptions/g, to: 'ApolloReactHooks.LazyQueryHookOptions' },
      { from: /Apollo\.SuspenseQueryHookOptions/g, to: 'ApolloReactHooks.SuspenseQueryHookOptions' },
      { from: /Apollo\.UseSuspenseQueryResult/g, to: 'ApolloReactHooks.UseSuspenseQueryResult' },
      { from: /Apollo\.QueryResult/g, to: 'ApolloReactHooks.QueryResult' },
      { from: /Apollo\.MutationHookOptions/g, to: 'ApolloReactHooks.MutationHookOptions' },
      { from: /export type (\w+)MutationFn = Apollo\.MutationFunction<([^,]+), ([^>]+)>;/g, to: 'export type $1MutationFn = (variables?: $3) => Promise<{ data?: $2; errors?: any }>;' },
      { from: /Apollo\.MutationResult/g, to: 'ApolloReactHooks.MutationResult' },
      { from: /Apollo\.BaseMutationOptions/g, to: 'ApolloReactHooks.BaseMutationOptions' },
      { from: /Apollo\.useQuery/g, to: 'ApolloReactHooks.useQuery' },
      { from: /Apollo\.useLazyQuery/g, to: 'ApolloReactHooks.useLazyQuery' },
      { from: /Apollo\.useSuspenseQuery/g, to: 'ApolloReactHooks.useSuspenseQuery' },
      { from: /Apollo\.useMutation/g, to: 'ApolloReactHooks.useMutation' },
      { from: /Apollo\.skipToken/g, to: 'skipToken' },
      { from: /Apollo\.SkipToken/g, to: 'SkipToken' },
    ];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

// Add @ts-ignore to all useSuspenseQuery overload signatures to fix type compatibility
// Second overload (with SkipToken) - add @ts-ignore before it
content = content.replace(
  /^export function use(\w+)SuspenseQuery\(baseOptions\?:\s*SkipToken \| ApolloReactHooks\.SuspenseQueryHookOptions<([^>]+)>\):\s*ApolloReactHooks\.UseSuspenseQueryResult<([^>]+)>;/gm,
  '// @ts-ignore - Overload compatibility\nexport function use$1SuspenseQuery(baseOptions?: SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<$2>): ApolloReactHooks.UseSuspenseQueryResult<$3>;'
);

// Implementation (third overload) - add @ts-ignore before it
content = content.replace(
  /^export function use(\w+)SuspenseQuery\(baseOptions\?:\s*SkipToken \| ApolloReactHooks\.SuspenseQueryHookOptions<([^>]+)>\) \{/gm,
  '// @ts-ignore - Overload compatibility\nexport function use$1SuspenseQuery(baseOptions?: SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<$2>) {'
);

// Add @ts-ignore to all return statements with useSuspenseQuery to fix type errors
content = content.replace(
  /(\s+)return ApolloReactHooks\.useSuspenseQuery</g,
  '$1// @ts-ignore - Type compatibility\n$1return ApolloReactHooks.useSuspenseQuery<'
);

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed Apollo Client imports in generated/graphql.tsx');
