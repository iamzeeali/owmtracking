import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const Reports = () => {
  const [chartData, setChartData] = useState({
    LineChartData: {},
    barChartData: {},
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      LineChartData: {
        labels: ["I0001", "I0001", "I0002", "I0003", "I0004", "I0005"],
        datasets: [
          {
            label: "Inventory",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      barChartData: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Customers",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    //eslint-diable-next-line
  }, []);

  const { LineChartData, barChartData } = chartData;

  return (
    <div>
      <div class='content-wrapper my-3'>
        <div class='container'>
          <h3>Reports & Analytics</h3>
          <div className='row my-5'>
            <div className='col-sm-6 col-md-6 animated fadeIn'>
              <div className=''>
                <Bar
                  data={barChartData}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>

            <div className='col-sm-6 col-md-6 animated fadeIn'>
              <div className=''>
                <Line
                  data={LineChartData}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
