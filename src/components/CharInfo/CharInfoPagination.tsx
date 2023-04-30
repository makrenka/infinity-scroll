import classNames from "classnames";
import { HandySvg } from "handy-svg";
import { ResponseAPI } from '../../interfaces/interfaces';

import closeBtn from '../../assets/img/close-button.svg';

export const CharInfoPagination = ({ selectedId, onModal, closeModal, data }: {
    selectedId: number | null;
    onModal: boolean;
    closeModal: () => void;
    data: ResponseAPI;
}) => {

    const content = () => {
        const char = data?.results.filter((item) => item.id === selectedId)[0];
        return (
            <div className="char-info__wrapper">
                <img src={char?.image} alt="abyss" className='char-info__img' />
                <div className='char-info__description'>
                    <table className='char-info__description-table'>
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <th>Origin:</th>
                            </tr>
                            <tr>
                                <td>{char?.name}</td>
                                <td>{char?.origin.name}</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <th>Location:</th>
                            </tr>
                            <tr>
                                <td>{char?.status}</td>
                                <td>{char?.location.name}</td>
                            </tr>
                            <tr>
                                <th>Species:</th>
                                <th>Gender:</th>
                            </tr>
                            <tr>
                                <td>{char?.species}</td>
                                <td>{char?.gender}</td>
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