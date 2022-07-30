import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, color, name }) => {
    const getBadgeClasses = (color) => `badge m-2 bg-${color}`;
    return (
        <span key={_id} className={getBadgeClasses(color)}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Quality;
