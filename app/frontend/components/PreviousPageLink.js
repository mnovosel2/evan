import React from 'react';
import { history } from '../store';

const PreviousPageLink = () => {
    const returnToPreviousPage = (e) =>  {
        e.preventDefault();
        history.goBack();
    };
    return (
        <a
            className="anchor disclosure disclosure--left forgot-pwd__return"
            href="#"
            onClick={returnToPreviousPage}
        >
            <svg>
                <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
            </svg>
           Previous
        </a>
    );
};

export default PreviousPageLink;