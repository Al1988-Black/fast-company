import React from "react";
import Select from "react-select"; // установить через терминал
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    const indexArray = (arrayAll, arrayOnly) => {
        const defaultArrayindex = [];
        for (const elemAll of arrayAll) {
            for (const elem of arrayOnly) {
                if (elem.value === elemAll.value) {
                    const index = arrayAll.indexOf(elemAll);
                    defaultArrayindex.push(index);
                }
            }
        }
        console.log(defaultArrayindex);

        return defaultArrayindex;
    };
    console.log(
        indexArray(optionsArray, defaultValue).map(
            (item, index) => optionsArray[index]
        )
    );

    console.log(
        indexArray(optionsArray, defaultValue)[0],
        indexArray(optionsArray, defaultValue)[1]
    );

    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                defaultValue={[optionsArray[1], optionsArray[3]]}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
