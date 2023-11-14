import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  DateTime,
  Inject,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

class LinearChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: new Date().getFullYear(),
      temperatureData: [
        { x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 100) }, // Janeiro
        { x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 100) }, // Fevereiro
        { x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 100) }, // Março
        { x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 100) }, // Abril
        { x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 100) }, // Maio
        { x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 100) }, // Junho
        { x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 100) }, // Julho
        { x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 100) }, // Agosto
        { x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 100) }, // Setembro
        { x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 100) }, // Outubro
        { x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 100) }, // Novembro
        { x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 100) }, // Dezembro],
      ],
      humidityData: [
        { x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 100) }, // Janeiro
        { x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 100) }, // Fevereiro
        { x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 100) }, // Março
        { x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 100) }, // Abril
        { x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 100) }, // Maio
        { x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 100) }, // Junho
        { x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 100) }, // Julho
        { x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 100) }, // Agosto
        { x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 100) }, // Setembro
        { x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 100) }, // Outubro
        { x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 100) }, // Novembro
        { x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 100) }, // Dezembro],
      ],
      flammableGasData: [
        { x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 100) }, // Janeiro
        { x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 100) }, // Fevereiro
        { x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 100) }, // Março
        { x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 100) }, // Abril
        { x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 100) }, // Maio
        { x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 100) }, // Junho
        { x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 100) }, // Julho
        { x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 100) }, // Agosto
        { x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 100) }, // Setembro
        { x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 100) }, // Outubro
        { x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 100) }, // Novembro
        { x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 100) }, // Dezembro],
      ],
      carbonMonoxideData: [
        { x: new Date(2023, 0, 1), y: Math.floor(Math.random() * 100) }, // Janeiro
        { x: new Date(2023, 1, 1), y: Math.floor(Math.random() * 100) }, // Fevereiro
        { x: new Date(2023, 2, 1), y: Math.floor(Math.random() * 100) }, // Março
        { x: new Date(2023, 3, 1), y: Math.floor(Math.random() * 100) }, // Abril
        { x: new Date(2023, 4, 1), y: Math.floor(Math.random() * 100) }, // Maio
        { x: new Date(2023, 5, 1), y: Math.floor(Math.random() * 100) }, // Junho
        { x: new Date(2023, 6, 1), y: Math.floor(Math.random() * 100) }, // Julho
        { x: new Date(2023, 7, 1), y: Math.floor(Math.random() * 100) }, // Agosto
        { x: new Date(2023, 8, 1), y: Math.floor(Math.random() * 100) }, // Setembro
        { x: new Date(2023, 9, 1), y: Math.floor(Math.random() * 100) }, // Outubro
        { x: new Date(2023, 10, 1), y: Math.floor(Math.random() * 100) }, // Novembro
        { x: new Date(2023, 11, 1), y: Math.floor(Math.random() * 100) }, // Dezembro],
      ],
    };
  }

  // fetchDataForYear = async (year) => {
  //   try {
  //     // Substitua esta URL pela URL real do seu backend
  //     const response = await axios.get(`https://your-backend.com/data?year=${year}`);
  //     // Assumindo que o backend retorna os dados no seguinte formato:
  //     // { temperatureData: [...], humidityData: [...], flammableGasData: [...], carbonMonoxideData: [...] }
  //     this.setState({
  //       temperatureData: response.data.temperatureData,
  //       humidityData: response.data.humidityData,
  //       flammableGasData: response.data.flammableGasData,
  //       carbonMonoxideData: response.data.carbonMonoxideData
  //     });
  //   } catch (error) {
  //     console.error("Could not fetch data: ", error);
  //     // Trate o erro conforme achar melhor
  //   }
  // };

  handleChangeYear = (event) => {
    const newYear = event.target.value;
    this.setState({ selectedYear: newYear });
    //this.fetchDataForYear(newYear);
  };

  render() {
    const { selectedYear } = this.state;

    const years = Array.from(
      { length: 5 },
      (_, index) => new Date().getFullYear() - index
    );

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
          <h1>Médial Mensal</h1>

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
            valueType: "DateTime",
            labelFormat: "MMM",
            intervalType: "Months",
          }}
          primaryYAxis={{ labelFormat: "{value}" }}
          legendSettings={{ visible: true }}
        >
          <Inject services={[LineSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {/* Temperatura */}
            <SeriesDirective
              dataSource={this.state.temperatureData}
              name="Temperatura"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="red"
            />
            {/* Umidade */}
            <SeriesDirective
              dataSource={this.state.humidityData}
              name="Umidade"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="blue"
            />
            {/* Gás Inflamável */}
            <SeriesDirective
              dataSource={this.state.flammableGasData}
              name="Gás Inflamável"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="green"
            />
            {/* Monóxido de Carbono */}
            <SeriesDirective
              dataSource={this.state.carbonMonoxideData}
              name="Monóxido de Carbono"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="purple"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    );
  }
}

export default LinearChart;
