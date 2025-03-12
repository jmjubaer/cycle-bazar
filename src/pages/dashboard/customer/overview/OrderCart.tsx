import { useMemo } from "react";
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

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Function to generate last 7 days in YYYY-MM-DD format
const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
};

// Function to group MongoDB data by date
const groupByDate = (data: { createdAt: string }[], last7Days: string[]) => {
    const groupedData: { [key: string]: number } = {};

    data.forEach((item) => {
        const date = item.createdAt.split("T")[0]; // Extract YYYY-MM-DD
        groupedData[date] = (groupedData[date] || 0) + 1; // Count occurrences
    });

    // Ensure all last 7 days exist
    return last7Days.map((day) => groupedData[day] || 0);
};

const OrderCart = ({ totalOrders }: any) => {
    const last7Days = useMemo(() => getLast7Days(), []);

    const chartData = {
        labels: last7Days,
        datasets: [
            {
                label: "Orders",
                data: groupByDate(totalOrders, last7Days),
                backgroundColor: "#f87171", // Red
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: { color: "#000" },
            },
            title: {
                display: true,
                text: "Last 7 Days Activity Overview",
                color: "#000",
            },
        },
        scales: {
            x: { ticks: { color: "#000" }, grid: { color: "#444" } },
            y: { ticks: { color: "#000" }, grid: { color: "#444" } },
        },
    };

    return (
        <div className='bg-primary/10 p-6 rounded-xl shadow-md text-white w-full'>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default OrderCart;
