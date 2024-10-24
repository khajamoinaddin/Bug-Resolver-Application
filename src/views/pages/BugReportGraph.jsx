import React, { useEffect, useState } from "react";
import ReportCharts from "../components/BugGraph/ReportCharts";
import MainLayout from "../layouts/MainLayout";
import { getBugGraphReportService } from "../../services/bugs.api";

const BugReportGraph = () => {
  const [reportData, setreportData] = useState({
    priorityReport: [],
    statusReport: [],
    combinedReport: [],
  });

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    const response = await getBugGraphReportService();
    if (response?.success) {
      setreportData(response?.data);
    }
  };

  return (
    <MainLayout>
      <ReportCharts data={reportData} />
    </MainLayout>
  );
};

export default BugReportGraph;
