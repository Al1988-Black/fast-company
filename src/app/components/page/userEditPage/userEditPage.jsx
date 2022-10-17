import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import BackButton from "../../common/backButton";
import { useUsers } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfesions";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = ({ userId }) => {
    const history = useHistory();
    const { getUserById } = useUsers();
    const { currentUser, updateUser } = useAuth();

    const user = getUserById(userId);
    const { isLoading: isLoadingProfession, professions } = useProfession();

    const { qualities, isLoading: isLoadingQuality, getQuality } = useQuality();

    const [dataUser, setDataUser] = useState(user);
    const [profList, setProfList] = useState([]);
    const [qualitiesList, setQualitiesList] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoadingPage, setIsLoading] = useState(false);
    useEffect(() => {
        if (currentUser._id !== userId) {
            setIsLoading(true);
            history.replace(`/users/${currentUser._id}/edit`);
        }
    }, []);

    const getQualities = (qualities) => {
        return qualities.map((q) => q.value);
    };

    useEffect(() => {
        setIsLoading(true);
        if (dataUser._id && !isLoadingQuality && !isLoadingProfession) {
            const professionArray = professions.map((prof) => ({
                label: prof.name,
                value: prof._id
            }));

            setProfList(professionArray);

            const qualitiesArray = qualities.map((q) => ({
                value: q._id,
                label: q.name,
                color: q.color
            }));

            setQualitiesList(qualitiesArray);

            const qualitiesUser = user.qualities.map((qualityId) => {
                const quality = getQuality(qualityId);
                return {
                    value: qualityId,
                    label: quality.name,
                    color: quality.color
                };
            });

            setDataUser({ ...user, qualities: qualitiesUser });

            setIsLoading((prevState) => !prevState);
        }
    }, [dataUser._id, isLoadingQuality, isLoadingProfession]);

    console.log(dataUser);

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
            },
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUser({
                ...dataUser,
                qualities: getQualities(dataUser.qualities)
            });
            console.log({
                ...dataUser,
                qualities: getQualities(dataUser.qualities)
            });
        } catch (error) {
            setErrors(error);
        } finally {
            history.replace(`/users/${userId}`);
        }
    };

    return (
        <div className="container mt-5">
            {!isLoadingPage ? (
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
                                    options={profList}
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
                                    options={qualitiesList}
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
            ) : (
                "Loading"
            )}
        </div>
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string
};

export default UserEditPage;
