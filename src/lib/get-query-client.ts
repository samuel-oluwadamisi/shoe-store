import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// cache() is used to memoize the QueryClient across many server components
const getQueryClient = cache(
    () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 3 * 60 * 1000,
                },
            },
        })
);

export default getQueryClient;
