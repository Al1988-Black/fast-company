import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesListId }) => {
    const { isLoading } = useQuality();
    if (!isLoading) {
        return (
            <>
                {qualitiesListId.map((qualityId) => (
                    <Quality key={qualityId} id={qualityId} />
                ))}
            </>
        );
    }
    return "Loading";
};

QualitiesList.propTypes = {
    qualitiesListId: PropTypes.array
};
export default QualitiesList;
