import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";

function Dashboard() {
    usePageTitle("Dashabord");
    const { user } = useAuth();
    return <h1>Welcome {user.name}</h1>;
}

export default Dashboard;
