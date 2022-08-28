import { useState } from "react";
import useFormValidationError from "./useFormValidationError";

function useFormState(initState = {}, initErrorState = {}) {
    const { formValidationError, setFormValidationError } =
        useFormValidationError(initErrorState);
    const [formState, setFormState] = useState(initState);

    const handleInputChange = (e) => {
        // console.log(e.target.multiple)

        if (e.target.type === "file") {
            e.preventDefault();
            setFormState({ ...formState, [e.target.name]: e.target.files[0] });
        } else if (e.target.tagName === "SELECT" && e.target?.multiple) {
            e.preventDefault();
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(+options[i].value);
                }
            }
            setFormState({ ...formState, [e.target.name]: value });
        } else if (e.target.type === "checkbox") {
            setFormState({
                ...formState,
                [e.target.name]: e.target.checked,
            });
        } else {
            e.preventDefault();
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    return {
        formValidationError,
        setFormValidationError,
        formState,
        setFormState,
        handleInputChange,
    };
}

export default useFormState;
