import React from "react";
import LinearChart from "./yearaveragecomponent";
import RealTimeChart from "./realtimecomponent";
import SensorDataGrid from "./datagridcomponent";
import RealTimeDataGrid from "./realtimedatagridcomponent";

import "./linechart.css"; // Verifique se este caminho está correto

function ChartPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div>
        <LinearChart />
      </div>
      <div
        className="chart-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          gap: "1rem",
          flexDirection: 'row', // padrão para telas maiores
        }}
      >
        <div className="chart-item" style={{ flex: 1 }}>
          <RealTimeChart />
        </div>
        <div className="chart-item" style={{ flex: 1 }}>
          <RealTimeDataGrid />
        </div>
      </div>
      <div>
        <SensorDataGrid />
      </div>
    </div>
  );
}

export default ChartPage;
