import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(({_id}) => _id !== userId));
    }

    return (
        <>
            <SearchStatus number={users.length} />
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качество</th>
                    <th scope="col">Проффессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"/>
                    </tr>
                </thead>
                <tbody>{users.map((user) =>
                    <User 
                        key={user._id} 
                        {...user}
                        onDelete={handleDelete}
                    />)}
                </tbody>
            </table>
        </>
    )
    
}

export default Users;