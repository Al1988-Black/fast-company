import React from "react";
import PropTypes from "prop-types";

const Quality = ({ id, color, name }) => {
    const getBadgeClasses = (color) => `badge m-2 bg-${color}`;
    return (
        <span key={id} className={getBadgeClasses(color)}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Quality;
