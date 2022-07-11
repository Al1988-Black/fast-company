import React, { useState } from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(({_id}) => _id !== userId));
    }

    const renderPhrase = (number) => {
        if (number >= 2 && number <= 4) {
            return `${number} человека тусанут`;
        }
        return `${number} человек тусанет`;
    }

    const getBadgeClasses = (color) => `badge m-2 bg-${color}`;

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
                    <th scope="col"/>
                    </tr>
                </thead>
                <tbody>{users.map((
                        {
                         _id,
                         name,
                         qualities,
                         profession,
                         completedMeetings,
                         rate           
                        }) => (
                        <tr key={_id}>
                            <td>{name}</td>
                            <td>
                                {qualities.map(({_id, color, name}) => (
                                    <span key={_id} className={getBadgeClasses(color)}>{name}</span>
                                    ))
                                }
                            </td>
                            <td>{profession.name}</td>
                            <td>{completedMeetings}</td>
                            <td>{rate}/5</td>
                            <td>
                                <button className="btn bg-danger btn-sm m-2" onClick={() => handleDelete(_id)}>delete</button>
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