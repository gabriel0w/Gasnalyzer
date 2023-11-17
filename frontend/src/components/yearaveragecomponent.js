import React, { Component } from "react";
import axios from "axios";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  Category,
  Inject,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

class LinearChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      sensorData: {},
    };
  }

  componentDidMount() {
    this.fetchDataForYear(this.state.selectedYear);
  }

  fetchDataForYear = async (year) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/data/monthly-average/${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const monthsInOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const sortedData = {};
      for (const sensorType in response.data) {
        sortedData[sensorType] = {};

        monthsInOrder.forEach((month) => {
          sortedData[sensorType][month] = response.data[sensorType][month] || 0;
        });
      }

      this.setState({ sensorData: sortedData });
    } catch (error) {
      console.error("Could not fetch data: ", error);
    }
  };

  handleChangeYear = (event) => {
    const newYear = event.target.value;
    this.setState({ selectedYear: newYear }, () => {
      this.fetchDataForYear(newYear);
    });
  };

  render() {
    const { selectedYear, sensorData } = this.state;
    const years = Array.from(
      { length: 5 },
      (_, index) => new Date().getFullYear() - index
    );

    const seriesData = Object.entries(sensorData);

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Média Mensal por Sensor</h1>
          <p>Selecione o ano de interesse</p>
          <FormControl
            variant="outlined"
            style={{
              marginBottom: "20px",
              minWidth: "120px",
            }}
          >
            <InputLabel>Ano</InputLabel>
            <Select
              value={selectedYear}
              onChange={this.handleChangeYear}
              label="Ano"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <ChartComponent
          id="line-chart"
          primaryXAxis={{
            valueType: "Category",
            labelPlacement: "OnTicks",
          }}
          primaryYAxis={{ labelFormat: "{value}" }}
          legendSettings={{ visible: true }}
        >
          <Inject services={[LineSeries, Category, Legend]} />
          <SeriesCollectionDirective>
            {seriesData.map(([sensorType, dataPoints], index) => (
              <SeriesDirective
                key={sensorType}
                dataSource={Object.entries(dataPoints)}
                xName="0"
                yName="1"
                type="Line"
                marker={{ visible: true }}
                name={sensorType}
              />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }
}

export default LinearChart;
