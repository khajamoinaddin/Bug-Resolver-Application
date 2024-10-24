import React from "react";
import Chart from "react-apexcharts";

const ReportCharts = ({ data }) => {
  console.log(data);
  const priorityData = data?.priorityReport?.map((item) => item.count);
  const priorityLabels = data?.priorityReport?.map((item) => item._id);

  const statusData = data?.statusReport?.map((item) => item.count);
  const statusLabels = data?.statusReport?.map((item) => item._id);

  const combinedData = data?.combinedReport?.map((item) => item.count);
  const combinedLabels = data?.combinedReport?.map(
    (item) => `${item._id.priority} - ${item._id.status}`
  );

  const priorityOptions = {
    chart: {
      type: "pie",
    },
    labels: priorityLabels,
    title: {
      text: "Priority Report",
    },
  };

  const statusOptions = {
    chart: {
      type: "pie",
    },
    labels: statusLabels,
    title: {
      text: "Status Report",
    },
  };

  const combinedOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: combinedLabels,
    },
    title: {
      text: "Combined Report (Priority & Status)",
    },
  };

  return (
    <div className="space-y-10 p-3">
      <h2 className=" text-5xl text-center font-bold">Reports</h2>

      <div className="flex">
        <div className="w-full">
          <Chart
            options={priorityOptions}
            series={priorityData ?? []}
            type="pie"
            width="380"
          />
        </div>
        <div className="w-full">
          <Chart
            options={statusOptions}
            series={statusData ?? []}
            type="pie"
            width="380"
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Chart
          options={combinedOptions}
          series={[{ data: combinedData ?? [] }]}
          type="bar"
          height="400"
        />
      </div>
    </div>
  );
};

export default ReportCharts;
