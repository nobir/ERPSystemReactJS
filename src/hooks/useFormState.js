import { useState } from "react";
import useFormValidationError from "./useFormValidationError";

function useFormState(initState = {}, initErrorState = {}) {
    const { formValidationError, setFormValidationError } = useFormValidationError(initErrorState);
    const [formState, setFormState] = useState(initState);

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormState({ ...formState, [e.target.name]: e.target.value });
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
