import React, {useState} from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = (props) => {
    const [bookmark, setBookMark] = useState(false);

    const handleBookmark = () => {
        setBookMark((prevState)=>!prevState);
    }

    return (
    <tr>
        <td>{props.name}</td>
        <td>
            {props.qualities.map((qualitie) => 
                    <Qualitie key={qualitie._id} {...qualitie} />
                )
            }
        </td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <td><Bookmark status={bookmark} onBookmark={handleBookmark}/></td>
        <td>
            <button className="btn bg-danger btn-sm m-2" onClick={() => props.onDelete(props._id)}>delete</button>
        </td>
        </tr>
    )
}

export default User;