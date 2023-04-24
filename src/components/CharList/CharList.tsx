import { useEffect, useState } from "react";
import classNames from "classnames";
import { HandySvg } from "handy-svg";
import InfiniteScroll from "react-infinite-scroll-component";

import { useCharacterInfinite } from "../../hooks/useCharacterInfinite";
import { Spinner } from "../Spinner";
import { ContentPagination } from "./ContentPagination";

import upButton from '../../assets/img/up-arrow-button.svg';

import './CharList.scss';

export const CharList = (
    { onModal, isPagination, currentPage }: {
        onModal: (id: number) => void,
        isPagination: (pagination: boolean) => void,
        currentPage: number
    },
) => {

    const {
        characters, error, fetchNextPage, hasNextPage, status
    } = useCharacterInfinite();

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

    const infiniteContent = () => (
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
    );

    if (status === 'loading') return <Spinner />;

    if (status === 'error') return <p>Ups!, {`${error}` as string}</p>;

    return (
        <div className="char-list">
            {!pagination
                ? infiniteContent()
                : <ContentPagination
                    currentPage={currentPage}
                    onModal={(id: number) => onModal(id)}
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