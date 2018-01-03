import React from 'react';
import PropTypes from 'prop-types';

const userInformation = (props) => {
    return (
        <section>
            <div>{props.name}</div>
            <div>{props.id}</div>
        </section>
    );
};

export default userInformation;

userInformation.propTypes = {
    id      : PropTypes.string.isRequired,
    name    : PropTypes.string.isRequired
};
