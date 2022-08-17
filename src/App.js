import { useEffect, createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import Message from "./components/Message";
import SideMenu from "./components/menus/SideMenu";
import MainContent from "./components/MainContent";

const initialState = {
    pageTitle: "",
    successMessage: "",
    errorMessage: "",
};

export const GlobalStateContext = createContext(initialState);

const reduce = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "PAGE_TITLE":
            return { ...state, pageTitle: action.pageTitle };
        case "SUCCESS_MESSAGE":
            return { ...state, successMessage: action.successMessage };
        case "ERROR_MESSAGE":
            return { ...state, errorMessage: action.errorMessage };
        default:
            return state;
    }
};

function App() {
    const [globalState, dispatchGlobalState] = useReducer(reduce, initialState);

    useEffect(() => {
        document.title = globalState.pageTitle;

        return () => {
            document.title = "";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.pageTitle]);

    const token = localStorage.getItem("token");

    return (
        <GlobalStateContext.Provider
            value={{ globalState, dispatchGlobalState }}
        >
            <BrowserRouter>
                <Header />
                <main className="container-fluid py-2 my-3 border">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center">
                                {globalState.pageTitle} Page
                            </h1>
                        </div>
                    </div>
                    <hr />

                    <Message />

                    <div className="row d-flex justify-content-center">
                        {token ? (
                            <div className="col-12 col-md-3">
                                <SideMenu />
                            </div>
                        ) : null}

                        <div
                            className={"col-12 col-md-" + (token ? "9" : "12")}
                        >
                            <MainContent />
                        </div>
                    </div>
                </main>
                <Footer />
            </BrowserRouter>
        </GlobalStateContext.Provider>
    );
}

export default App;
