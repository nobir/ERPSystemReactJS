import { useEffect, useState } from "react";

function useFormValidationError(initialState = {}) {
    const [_formError, _setFormError] = useState(initialState);

    const formError = _formError;

    function setFormError(errors = {}) {
        _setFormError(errors);
    }

    useEffect(() => {
        _setFormError({});
        return () => {
            _setFormError({});
        };
    }, []);

    return { formError, setFormError };
}

export default useFormValidationError;
