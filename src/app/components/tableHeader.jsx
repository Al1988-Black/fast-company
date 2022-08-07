import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const iconUp = <i className="bi bi-caret-up-fill" />;
    const iconDown = <i className="bi bi-caret-down-fill" />;
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path === selectedSort.path &&
                            (selectedSort.order === "asc" ? iconUp : iconDown)}
                    </th>
                ))}
                {/*                     
                    <th scope="col">Качество</th>
                    <th onClick={() => handleSort("profession.name")} scope="col">Проффессия</th>
                    <th onClick={() =>handleSort("completedMeetings")} scope="col">Встретился, раз</th>
                    <th onClick={() => handleSort("rate")} scope="col">Оценка</th>
                    <th onClick={() => handleSort("bookmark")} scope="col">Избранное</th>
                    <th scope="col" /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
