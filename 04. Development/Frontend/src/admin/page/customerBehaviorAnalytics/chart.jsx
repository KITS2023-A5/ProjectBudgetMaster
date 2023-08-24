import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Space, DatePicker, Typography } from "antd";

const { Title, Text } = Typography;
Chart.register(CategoryScale);

function BarChart() {
  const Data = [
    {
      id: 1,
      type: "Living Service",
      expense: 80000,
    },
    {
      id: 2,
      type: "Moving",
      expense: 45677,
    },
    {
      id: 3,
      type: "Entertainment",
      expense: 78888,
    },
    {
      id: 4,
      type: "Self Growth",
      expense: 90000,
    },
    {
      id: 5,
      type: "Healthy",
      expense: 4300,
    },
  ];
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.type),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.expense),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div>
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Expense Behavior</h2>
        <Space>
          <Text>Month:</Text>
          <DatePicker picker="month"></DatePicker>
          <Text>Year:</Text>
          <DatePicker picker="year"></DatePicker>
        </Space>

        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                //   text: "Users Gained between 2016-2020"
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default BarChart;
