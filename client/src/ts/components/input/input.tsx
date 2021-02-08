import React from "react";
import cn from "classnames";
import "./input.scss";

export interface IInput {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    name?: any;
    multiple?: boolean;
}

const Input: React.FC<IInput> = React.memo(props => {
    const {
        onChange = () => {},
        className = "",
        value = "",
        placeholder = "",
        disabled = false,
        type = "",
        name = "",
        multiple = false
    } = props;
    const classes: string = cn("input", className, disabled);
    return (
        <input
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={classes}
            type={type}
            name={name}
            multiple={multiple}
        />
    );
});

export default Input;
