import { useState } from "react";
import classNames from "classnames";

import './Pagination.scss';

export const Pagination = (
    { onCurrentPage, pagination }: {
        onCurrentPage: (page: number) => void,
        pagination: boolean
    }
) => {
    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';

    const range = (from: number, to: number, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        };

        return range;
    };

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = 42;
    const pageNeighbours = 2;

    const fetchPageNumbers = () => {
        /**
     * totalNumbers: the total page numbers to show on the control
     */
        const totalNumbers = (pageNeighbours * 2) + 3;

        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let startEndInterval = range(startPage, endPage);

        /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (startEndInterval.length + 1);

        let pages = [];

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...startEndInterval];
                break;
            };

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...startEndInterval, ...extraPages, RIGHT_PAGE];
                break;
            };

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...startEndInterval, RIGHT_PAGE];
                break;
            };
        };

        return [1, ...pages, totalPages];
    };

    const gotoPage = (page: number) => {
        onCurrentPage(page);
        setCurrentPage(page);
    };

    const handleMoveLeft = () => {
        gotoPage(currentPage - 1);
    };

    const handleMoveRight = () => {
        gotoPage(currentPage + 1);
    };

    const pages = fetchPageNumbers();

    return (
        <ul className={classNames("pagination", { active: pagination })}>
            {pages.map((page, index) => {

                if (page === LEFT_PAGE) return (
                    <li className="pagination__item" key={index} onClick={handleMoveLeft}>
                        &laquo;
                    </li>
                );

                if (page === RIGHT_PAGE) return (
                    <li className="pagination__item" key={index} onClick={handleMoveRight}>
                        &raquo;
                    </li>
                );

                return (
                    <li
                        key={index}
                        className={classNames("pagination__item", { 'active': currentPage === page })}
                        onClick={() => gotoPage(+page)}
                    >
                        {page}
                    </li>
                )
            })}
        </ul>
    )
};