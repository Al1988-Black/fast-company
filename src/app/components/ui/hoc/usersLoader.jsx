import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataLoaded());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList());
        }
    }, []);
    if (!dataStatus) return "Loading";
    return children;
};
UsersLoader.propTypes = {
    childern: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
