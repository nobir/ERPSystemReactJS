import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Axios from "../../app/AxiosConfig";
import { ROUTES } from "../../app/Routes";
import Loading from "../../components/Loading";
import useErrorMessage from "../../hooks/useErrorMessage";
import usePageTitle from "../../hooks/usePageTitle";
import useSuccessMessage from "../../hooks/useSuccessMessage";

function CategoryStatistic() {
    useSuccessMessage();
    const { setErrorMessage } = useErrorMessage();

    usePageTitle("Top 10 Popular Category");

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        Axios.get(ROUTES.viewStatistic)
            .then((response) => {
                console.log(response);
                setCategories(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 0) {
                    setErrorMessage("Check your internet Connection");
                }

                if (error.response.status === 406) {
                    setErrorMessage(error.response.data.error_message);
                }
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(BarElement);
    ChartJS.register(Title);
    ChartJS.register(Tooltip);
    ChartJS.register(Legend);

    return isLoading ? (
        <Loading />
    ) : (
        <Bar
            data={{
                labels: [...categories.map((c) => c.name)],
                datasets: [
                    {
                        axis: "y",
                        label: "Category",
                        data: [...categories.map((c) => +c.total)],
                        backgroundColor: [
                            "rgb(244, 67, 54)",
                            "rgb(236, 64, 122)",
                            "rgb(156, 39, 176)",
                            "rgb(103, 58, 183)",
                            "rgb(63, 81, 181)",
                            "rgb(33, 150, 243)",
                            "rgb(0, 188, 212)",
                            "rgb(0, 150, 136)",
                            "rgb(76, 175, 80)",
                            "rgb(192, 202, 51)",
                        ],
                        borderColor: [
                            "rgb(244, 67, 54)",
                            "rgb(236, 64, 122)",
                            "rgb(156, 39, 176)",
                            "rgb(103, 58, 183)",
                            "rgb(63, 81, 181)",
                            "rgb(33, 150, 243)",
                            "rgb(0, 188, 212)",
                            "rgb(0, 150, 136)",
                            "rgb(76, 175, 80)",
                            "rgb(192, 202, 51)",
                        ],
                        borderWidth: 1,
                        barPercentage: 0.5,
                        maxBarThickness: 20,
                        minBarLength: 2,
                    },
                ],
            }}
            options={{
                indexAxis: "y",
                elements: {
                    bar: {
                        borderWidth: 2,
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: "right",
                    },
                    title: {
                        display: true,
                        text: "Popular by Invoice Created",
                    },
                },
            }}
        />
    );
}

export default CategoryStatistic;
