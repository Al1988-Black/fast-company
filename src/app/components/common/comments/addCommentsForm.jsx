import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../form/selectField";
import AreaTextField from "../form/areaTextField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const initialData = { userId: "", content: "" };

const AddCommentsForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    useEffect(() => {
        if (users) setIsLoading(false);
    }, [users]);
    const arrayUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    const isValid = Object.keys(errors).length === 0;
    return (
        !isLoading && (
            <div>
                <h2>New comment</h2>
                <form onSubmit={handleSubmit}>
                    <SelectField
                        onChange={handleChange}
                        options={arrayUsers}
                        label=""
                        name="userId"
                        defaultOption="Выберите пользователя..."
                        error={errors.userId}
                        value={data.userId}
                    />
                    <AreaTextField
                        label="Сообщение"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        )
    );
};

AddCommentsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
export default AddCommentsForm;
