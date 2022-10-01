import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualitiesListId }) => {
    return (
        <>
            {qualitiesListId.map((qualityId) => (
                <Quality key={qualityId} id={qualityId} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesListId: PropTypes.array
};
export default QualitiesList;
