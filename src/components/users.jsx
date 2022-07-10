import React, { useState } from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    }

    const renderPhrase = (number) => {
        if (number >= 2 && number <= 4) {
            return `${number} человека тусанут`;
        }
        return `${number} человек тусанет`;
    }

    const getBageClasses = (color) => {
        let classes = "badge m-2 bg-";
        classes += color;
        return classes
    }

    if (users.length === 0) {
        return <h1><span className="badge bg-danger"> Никто с тобой не тусанет</span></h1>
    }
    
    return (
        <>
            <h1><span className="badge bg-primary">{renderPhrase(users.length)} с тобой сегодня</span></h1>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качество</th>
                    <th scope="col">Проффессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>{users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((quality) => (
                                    <span key={quality._id} className={getBageClasses(quality.color)}>{quality.name}</span>
                                    ))
                                }
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}/5</td>
                            <td>
                                <button className="btn bg-danger btn-sm m-2" onClick={() => handleDelete(user._id)}>delete</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    )
    
}

export default Users;