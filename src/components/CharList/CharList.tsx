import { useEffect, useState } from "react";
import classNames from "classnames";
import { HandySvg } from "handy-svg";

import { ContentPagination } from "./ContentPagination";
import { ContentInfinte } from "./ContentInfinte";

import upButton from '../../assets/img/up-arrow-button.svg';

import './CharList.scss';


export const CharList = (
    { onModal, isPagination, currentPage }: {
        onModal: (id: number) => void,
        isPagination: (pagination: boolean) => void,
        currentPage: number
    },
) => {

    const [scroll, setScroll] = useState(0);
    const [pagination, setPagination] = useState(false);

    const displayUpBtn = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', displayUpBtn);
        return () => window.removeEventListener('scroll', displayUpBtn);
    }, []);

    const togglePagination = () => {
        setPagination(!pagination);
    };

    useEffect(() => {
        isPagination(pagination);
    });

    return (
        <div className="char-list">
            {!pagination
                ? <ContentInfinte
                    onModal={(id: number) => onModal(id)}
                />
                : <ContentPagination
                    currentPage={currentPage}
                />}
            <button
                className={classNames('char-list__up-btn', { active: scroll > 400 })}
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
                <HandySvg
                    src={upButton}
                    className='char-list__up-btn-icon'
                    width='50'
                    height='50'
                />
            </button>
            <button className='char-list__pagination-toggle' onClick={togglePagination}>
                {pagination ? 'Without pagination' : 'Display pagination'}
            </button>
        </div>
    )
}