import { useEffect, useState } from "react";

function useFormValidationError(initialState = {}) {
    const [_formValidationError, _setFormValidationError] = useState(initialState);

    const formValidationError = _formValidationError;

    function setFormValidationError(errors = {}) {
        _setFormValidationError(errors);
    }

    useEffect(() => {
        _setFormValidationError({});
        return () => {
            _setFormValidationError({});
        };
    }, []);

    return { formValidationError, setFormValidationError };
}

export default useFormValidationError;
