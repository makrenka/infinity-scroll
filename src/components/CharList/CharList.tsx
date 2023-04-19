import { useCharacter } from "../../hooks/useCharacter";
import { Spinner } from "../Spinner";

import './CharList.scss';

export const CharList = () => {

    const { characters, error, fetchNextPage, hasNextPage, status } = useCharacter();
    console.log(characters?.info.next.split('='))
    if (status === 'loading') return <Spinner />;

    if (status === 'error') return <p>Ups!, {`${error}`}</p>;

    return (
        <div className="char-list">
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
        </div>
    )
}