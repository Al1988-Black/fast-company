import React, { useState, useEffect } from "react";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import UsersTable from "../../ui/usersTable";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import SearchUsers from "../../common/form/searchUsers";
import { validator } from "../../../utils/validator";
import { useUsers } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({
        path: null,
        order: "asc"
    });
    const [errors, setErrors] = useState({});
    const [searchUsersData, setSearchUsersData] = useState({ search: "" });
    const validatorConfig = {
        search: {
            isNotContainDigit: {
                message: "Имя не может содержать цифры"
            }
        }
    };
    const { users } = useUsers();
    useEffect(() => {
        // api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        validate();
    }, [searchUsersData]);
    const validate = () => {
        const errors = validator(searchUsersData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) =>
        console.log(
            users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );

    const handleProfessionSelect = (item) => {
        setSearchUsersData({ search: "" });
        setSelectedProf(item);
    };

    const handleSearchUsers = ({ target }) => {
        setSelectedProf(null);
        setSearchUsersData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

    const handleSort = (item) => setSortBy(item);

    if (!users) {
        return "Loading...";
    }

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;
    const searchUsers =
        searchUsersData.search.length &&
        users.filter((user) =>
            user.name
                .toLowerCase()
                .includes(searchUsersData.search.trim().toLowerCase())
        );
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const pageSize = 8;
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf(null);
        setSearchUsersData({ search: "" });
    };

    usersCrop.length === 0 && setCurrentPage(currentPage - 1);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <SearchUsers
                    error={errors.search}
                    value={searchUsersData.search}
                    onSearchUsers={handleSearchUsers}
                />
                {count > 0 && (
                    <UsersTable
                        users={searchUsers || usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    {!searchUsers && (
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
