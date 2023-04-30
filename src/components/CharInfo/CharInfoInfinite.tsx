import classNames from "classnames";
import { HandySvg } from "handy-svg";

import { useCharacterInfinite } from "../../hooks/useCharacterInfinite";

import closeBtn from '../../assets/img/close-button.svg';

import './CharInfo.scss';

export const CharInfoInfinite = ({ selectedId, onModal, closeModal }: {
    selectedId: number | null;
    onModal: boolean;
    closeModal: () => void;
}) => {

    const { characters } = useCharacterInfinite();

    const content = () => {
        const character = characters?.results.filter((item) => item.id === selectedId)[0];
        return (
            <div className="char-info__wrapper">
                <img src={character?.image} alt="abyss" className='char-info__img' />
                <div className='char-info__description'>
                    <table className='char-info__description-table'>
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <th>Origin:</th>
                            </tr>
                            <tr>
                                <td>{character?.name}</td>
                                <td>{character?.origin.name}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <th>Location:</th>
                            </tr>
                            <tr>
                                <td>{character?.status}</td>
                                <td>{character?.location.name}</td>
                            </tr>
                            <tr>
                                <th>Species:</th>
                                <th>Gender:</th>
                            </tr>
                            <tr>
                                <td>{character?.species}</td>
                                <td>{character?.gender}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={classNames("char-info", { active: onModal })}>
                {content()}
                <button className='char-info__close-btn' onClick={closeModal}>
                    <HandySvg
                        src={closeBtn}
                        className='char-info__close-btn-icon'
                        width='30'
                        height='30'
                    />
                </button>
            </div>
            <div className={classNames("overlay", { active: onModal })} onClick={closeModal}></div>
        </>
    );
};