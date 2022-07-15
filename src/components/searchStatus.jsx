import React from "react";

const SearchStatus = (props) => {
    const renderPhrase = (number) => {
        if (number >= 2 && number <= 4) {
            return `${number} человека тусанут`;
        }
        return `${number} человек тусанет`;
    }
    if (props.number === 0) {
        return <h1><span className="badge bg-danger"> Никто с тобой не тусанет</span></h1>
    }
    return (
        <h1><span className="badge bg-primary">{renderPhrase(props.number)} с тобой сегодня</span></h1>
    )
}

export default SearchStatus;