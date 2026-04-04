# Runtime Error Fix - Client/Server Component Serialization

## Problem
Next.js was throwing a runtime error:
```
Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. 
Classes or null prototypes are not supported.
```

## Root Cause
The `queryClient` instance was being created at module level in `src/lib/queryClient.ts` and passed directly to `QueryClientProvider` in the root layout (a Server Component). This caused serialization issues because:

1. Server Components serialize props passed to Client Components
2. Class instances (like QueryClient) cannot be serialized
3. In development mode with Turbopack, this creates new instances on every request

## Solution
Created a Client Component wrapper (`src/components/Providers.tsx`) that initializes the QueryClient using React's `useState` hook, ensuring:
- The QueryClient is created only once per client session
- No serialization is needed (it's all within Client Components)
- Proper React state management

### Files Changed

#### 1. Created: `src/components/Providers.tsx`
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5 * 60 * 1000,
						retry: 2,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
```

#### 2. Updated: `src/app/layout.tsx`
- Removed direct import of `queryClient` from `@/lib/queryClient`
- Removed direct import of `QueryClientProvider`
- Added import of `Providers` component
- Wrapped the app with `<Providers>` instead of `<QueryClientProvider client={queryClient}>`

## Result
✅ No more serialization errors
✅ QueryClient properly initialized per client session
✅ Server/Client Component boundary respected
✅ Application runs without errors on http://localhost:3000

## Best Practice
Always wrap third-party providers that require class instances (QueryClient, Redux Store, etc.) in a Client Component when using them in Next.js App Router layouts.
