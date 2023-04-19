import InfiniteScroll from "react-infinite-scroll-component";
import { useCharacter } from "../../hooks/useCharacter";
import { Spinner } from "../Spinner";

import './CharList.scss';

export const CharList = () => {

    const { characters, error, fetchNextPage, hasNextPage, status } = useCharacter();

    if (status === 'loading') return <Spinner />;

    if (status === 'error') return <p>Ups!, {`${error}` as string}</p>;

    return (
        <div className="char-list">
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
                            // onClick={() => { onModal(character.id) }}
                            key={id}
                        >
                            <img src={image} alt={name} className='char-list__grid-item-img' />
                            <p className='char-list__grid-item-title'>{name}</p>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    )
}