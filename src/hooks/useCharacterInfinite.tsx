import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { ResponseAPI } from "../interfaces/interfaces";

export const useCharacterInfinite = () => {
    const { data, error, fetchNextPage, fetchPreviousPage, status, hasNextPage } = useInfiniteQuery(
        ['characters'],
        async ({ pageParam = 1 }) => {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`);
            try { return await res.json(); }
            catch (err) {
                new Error(`Could not fetch, status: ${res.status}`);
            };
        },
        {
            getNextPageParam: (lastPage: ResponseAPI) => {
                const previousPage = lastPage.info.prev ? +lastPage.info.prev.split('=')[1] : 0;
                const currentPage = previousPage + 1;
                if (currentPage === lastPage.info.pages) return false;
                return currentPage + 1;
            }
        }
    );

    const characters = useMemo(() => data?.pages.reduce((prev, page) => {
        return {
            info: page.info,
            results: [...prev.results, ...page.results]
        }
    }), [data]);

    return {
        error, fetchNextPage, fetchPreviousPage, status, hasNextPage, characters, data
    };
};