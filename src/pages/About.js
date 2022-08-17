import useErrorMessage from "../hooks/useErrorMessage";
import usePageTitle from "../hooks/usePageTitle";
import useSuccessMessage from "../hooks/useSuccessMessage";

function About() {
    useErrorMessage();
    useSuccessMessage();
    usePageTitle("About");

    const teams = [
        {
            name: "Nobir Hossain Samuel",
            id: "19-41135-2",
        },
        {
            name: "Nahian Sajjad",
            id: "19-41154-2",
        },
    ];

    return (
        <div className="table-responsive w-100">
            <table className="table table-success table-striped min-width-400px">
                <thead className="table-dark">
                    <tr>
                        <th>Name (AIUB style)</th>
                        <th>ID (AIUB)</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.length > 0 ? (
                        teams.map((team, i) => (
                            <tr key={i}>
                                <td>{team.name}</td>
                                <td>{team.id}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No teams found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default About;
