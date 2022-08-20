import useAuth from "../../hooks/useAuth";

function Dashboard() {
    const { user } = useAuth();
    return <h1>Welcome {user.name}</h1>;
}

export default Dashboard;
