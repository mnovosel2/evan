import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const parseDate = (date) => {
    return moment.unix(date).format('MMM DD YYYY');
}

const Table = (props) =>
    <div className="table">
        <table>
            <thead>
            <tr>
                {props.headers.map((header, index) => {
                    return <th key={index}>{header}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            {props.content.length > 0 && props.content.map((row, index) => {
                return (<tr key={index}>
                    {row.map((element, i) => {
                        if (element.type === 'anchor') {
                            return (
                                <td key={i}>
                                    <Link className="disclosure anchor" to={`/transactions/details/${element.id}`}>
                                        {element.data}
                                        <svg>
                                            <use xlinkHref="/static/img/svg-sprite.svg#arrow"></use>
                                        </svg>
                                    </Link>
                                </td>
                            );
                        }
                        return <td data-label={element.label} key={i}>
                            <span>
                                {element.label === 'Date' ? parseDate(element.data) : element.data}
                            </span>
                        </td>;
                    })}
                </tr>);
            })}
            </tbody>
        </table>
    </div>;

Table.propTypes = {
    headers: PropTypes.array.isRequired,
    content: PropTypes.array.isRequired,
};

export default Table;
