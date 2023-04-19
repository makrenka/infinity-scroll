import { useCharacter } from "../../hooks/useCharacter"

export const CharList = () => {

    const { characters, error, fetchNextPage, hasNextPage, status } = useCharacter();

    return (
        <ul className="char-list__grid">
            {characters && characters.results.map(character => (
                <li
                    className="char-list__grid-item"
                    // onClick={() => { onModal(character.id) }}
                    key={character.id}
                >
                    <img src={character.image} alt={character.name} className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>{character.name}</p>
                </li>
            ))}
        </ul>
    )
}