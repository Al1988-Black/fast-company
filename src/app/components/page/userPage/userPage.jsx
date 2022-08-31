import React, { useState, useEffect } from "react";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    console.log(userId);
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log(user);
    const history = useHistory();
    const handleAllUsers = () => {
        history.replace(`/users/${userId}/edit`);
    };
    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>{user.name}</h1>
            <h2>{user.profession.name}</h2>
            <Qualities qualities={user.qualities} />
            <p>completed Meetings: {user.completedMeetings}</p>
            <h2>Rate:{user.rate}</h2>
            <button
                onClick={() => {
                    handleAllUsers();
                }}
            >
                Изменить
            </button>
        </>
    );
};

export default UserPage;
