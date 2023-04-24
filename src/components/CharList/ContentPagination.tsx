import { useQuery } from "react-query";
import { Spinner } from "../Spinner";

export const ContentPagination = ({ currentPage, onModal }: {
    currentPage: number;
    onModal: (id: number) => void;
}) => {

    const fetchCharacters = async (currentPage = 1) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        try { return await res.json(); }
        catch (err) {
            new Error(`Could not fetch, status: ${res.status}`);
        };
    };

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['charsPagination', currentPage],
        queryFn: () => fetchCharacters(currentPage),
        keepPreviousData: true
    });

    return (
        <ul className="char-list__grid">
            {isLoading ? <Spinner />
                : isError ? (
                    <p>Ups!, {`${error}` as string}</p>
                ) : (
                    data?.results.map(({ id, image, name }: {
                        id: number;
                        image: string;
                        name: string;
                    }) => (
                        <li
                            className="char-list__grid-item"
                            onClick={() => { onModal(id) }}
                            key={id}
                        >
                            <img src={image} alt={name} className='char-list__grid-item-img' />
                            <p className='char-list__grid-item-title'>{name}</p>
                        </li>
                    ))
                )}

        </ul>
    )
}