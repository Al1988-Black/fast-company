import React from "react";

const Qualitie = ({_id, color, name}) => {
    const getBadgeClasses = (color) => `badge m-2 bg-${color}`;
    return (
        <span key={_id} className={getBadgeClasses(color)}>{name}</span>
    );
}

export default Qualitie;