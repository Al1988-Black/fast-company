import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
// import { useQuality } from "../../../hooks/useQuality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) {
        return "Loading";
    }
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality
                    key={quality._id}
                    id={quality._id}
                    color={quality.color}
                    name={quality.name}
                />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
