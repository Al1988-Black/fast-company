import React, { useState } from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    ...props
}) => {
    const [bookmark, setBookMark] = useState(false);
    const handleBookmark = () => {
        setBookMark((prevState) => !prevState);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qualitie) => (
                    <Quality key={qualitie._id} {...qualitie} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark status={bookmark} onBookmark={handleBookmark} />
            </td>
            <td>
                <button
                    className="btn bg-danger btn-sm m-2"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
