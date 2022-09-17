import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import BackButton from "../../common/backButton";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const [dataUser, setDataUser] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getProfessionById = (id, professions) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        setIsLoading(true);
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.users.getById(userId).then((data) => {
            const { _id } = data.profession;
            const qualitiesUser = data.qualities.map((quality) => ({
                value: quality._id,
                label: quality.name,
                color: quality.color
            }));
            setDataUser({
                ...data,
                profession: _id,
                qualities: qualitiesUser
            });
        });
    }, []);

    useEffect(() => {
        if (dataUser._id) setIsLoading(false);
    }, [dataUser]);

    const handleChange = (target) => {
        setDataUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
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
        profession: {
            isRequired: {
                message: "Обязательно выберите свою проффесию"
            }
        },
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
            .update(userId, {
                ...dataUser,
                profession: getProfessionById(dataUser.profession, professions),
                qualities: getQualities(dataUser.qualities)
            })
            .then(() => history.replace(`/users/${userId}`));
    };

    return (
        <div className="container mt-5">
            {!isLoading && (
                <div className="container mt-5">
                    <BackButton />
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={dataUser.name}
                                    onChange={handleChange}
                                    error={errors.name}
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
                                    value={dataUser.profession}
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
            )}
        </div>
    );
};

export default UserEditPage;
