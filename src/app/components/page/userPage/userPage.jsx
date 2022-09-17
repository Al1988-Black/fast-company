import React, { useState, useEffect } from "react";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingCard";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (!user) {
        return "Loading....";
    }

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingCard value={user.rate} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
