import { useContext } from "react";
import { GlobalStateContext } from "../App";
function Message() {
    const { globalState } = useContext(GlobalStateContext);

    return (
        <>
            {globalState.errorMessage ? (
                <div className="col-12">
                    <div
                        className="alert alert-danger d-flex align-items-center"
                        role="alert"
                    >
                        <i className="bi bi-exclamation-triangle-fill flex-shrink-0 mr-2"></i>
                        <div>
                            <strong>{globalState.errorMessage}</strong>
                        </div>
                    </div>
                </div>
            ) : null}

            {globalState.successMessage ? (
                <div className="col-12">
                    <div
                        className="alert alert-success d-flex align-items-center"
                        role="alert"
                    >
                        <i className="bi bi-check-circle-fill flex-shrink-0 mr-2"></i>
                        <div>
                            <strong>{globalState.successMessage}</strong>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Message;
