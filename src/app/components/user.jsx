import React, { useState, useEffect } from "react";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useParams, useHistory } from "react-router-dom";

const User = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    console.log(userId);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    console.log(user);
    const history = useHistory();
    const handleAllUsers = () => {
        history.replace("/users");
    };
    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>{user.name}</h1>
            <h2>{user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <p>completed Meetings: {user.completedMeetings}</p>
            <h2>Rate:{user.rate}</h2>
            <button
                onClick={() => {
                    handleAllUsers();
                }}
            >
                все пользователи
            </button>
        </>
    );
};

export default User;
