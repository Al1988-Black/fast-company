import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQuality();

    if (!isLoading) {
        const { _id, color, name } = getQuality(id);
        const getBadgeClasses = (color) => `badge m-2 bg-${color}`;
        return (
            <span key={_id} className={getBadgeClasses(color)}>
                {name}
            </span>
        );
    }
    return "Loading";
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
