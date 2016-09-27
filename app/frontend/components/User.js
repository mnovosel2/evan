import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UserAvatar from './UserAvatar';
import CardIcon from './CardIcon';

const User = (props) => {
    const { user, cards } = props;
    return (
        <div className="element element--offset">
            <div className="container element__heading">
                <h1>Hi, {user.name}</h1>
            </div>
            <div className="element__inner">
                <div className="element__info container">
                    <UserAvatar
                        uploadAvatar
                        url={user.image_url}
                        alt={`${user.name} profile image`}
                    />
                    <div className="element__details">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <div className="payment-methods">
                            {cards.length > 0 && <p className="subparagraph">Payment methods</p>}
                            {cards.map((card) => {
                               return (
                                   <p key={card.id}>
                                       <CardIcon brand={card.brand} />
                                       {`${card.brand} xxxx${card.last4}`}
                                   </p>
                               );
                            })}
                        </div>
                        <Link className="anchor" to={"/account"}>Manage account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
};

export default User;
