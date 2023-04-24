import InfiniteScroll from "react-infinite-scroll-component";

import { useCharacterInfinite } from "../../hooks/useCharacterInfinite";
import { Spinner } from "../Spinner";

export const ContentInfinte = ({ onModal }: { onModal: (id: number) => void }) => {

    const {
        characters, error, fetchNextPage, hasNextPage, status
    } = useCharacterInfinite();

    if (status === 'loading') return <Spinner />;

    if (status === 'error') return <p>Ups!, {`${error}` as string}</p>;

    return (
        <InfiniteScroll
            dataLength={characters ? characters.results.length : 0}
            next={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
        >
            <ul className="char-list__grid">
                {characters && characters.results.map(({ id, image, name }) => (
                    <li
                        className="char-list__grid-item"
                        onClick={() => { onModal(id) }}
                        key={id}
                    >
                        <img src={image} alt={name} className='char-list__grid-item-img' />
                        <p className='char-list__grid-item-title'>{name}</p>
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    )
}