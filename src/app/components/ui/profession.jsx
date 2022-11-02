import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    }
    return "Loading";
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
