import React, { useEffect, useState } from "react";
import axios from "axios";
// const SERVER_BASE_URL="http://localhost:5000"
const SERVER_BASE_URL="https://stackoverflow-clone-bf06.onrender.com"
const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    globalUniqueCount: 0,
    totalViewCount: 0,
    dailyData: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/analytics`);
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard</h2>
      <p><strong>Total Views:</strong> {analytics.totalViewCount}</p>
      <p><strong>Global Unique Visitors:</strong> {analytics.globalUniqueCount}</p>
      <h3>Daily Data</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Daily Unique Visitors</th>
          </tr>
        </thead>
        <tbody>
          {analytics.dailyData.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>{entry.uniqueVisitors.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
