import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [dataUser, setDataUser] = useState({});
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setDataUser(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setDataUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    console.log(dataUser);
    const validatorConfig = {
        name: {
            isNotContainDigit: {
                message: "Имя не может содержать цифры"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        // profession: {
        //     isRequired: {
        //         message: "Обязательно выберите свою проффесию"
        //     }
        // },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без потверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [dataUser]);
    const validate = () => {
        const errors = validator(dataUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users
            .update(userId, dataUser)
            .then(() => history.replace(`/users/${userId}`));
    };
    if (!dataUser && !qualities && !professions) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            name="name"
                            value={dataUser.name}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={dataUser.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            onChange={handleChange}
                            options={professions}
                            name="profession"
                            label="Выберете вашу профессию"
                            defaultOption="Choose..."
                            error={errors.profession}
                            value=""
                        />
                        <RadioField
                            onChange={handleChange}
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={dataUser.sex}
                            name="sex"
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            onChange={handleChange}
                            defaultValue={dataUser.qualities}
                            options={qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
