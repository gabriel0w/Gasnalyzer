import React, { Component } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Resize,
} from "@syncfusion/ej2-react-grids";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";

class SensorDataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dateRange: [new Date(), new Date()],
    };
  }

  onDateRangeChange = (args) => {
    debugger;
    const startDate = args.value[0];
    const endDate = args.value[1];
    this.fetchNewData(startDate, endDate);
  };

  fetchNewData = async (startDate, endDate) => {
    const getToken = () => localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    const apiUrl = `${process.env.REACT_APP_API_URL}/api/data/between-dates/${startDate.toISOString()}/${endDate.toISOString()}`;
    try {
      const response = await axios.get(apiUrl, config);
      // Mapeamento dos dados recebidos para o formato da tabela
      const mappedData = response.data.map((item) => ({
        Data_id: item.Data_id,
        Microcontrolador:
          item.Sensor.Microcontrolador.tipo_chip +
          " - " +
          item.Sensor.Microcontrolador.Localizacao,
        Sensor: item.Sensor.tipo,
        Medida: item.unidade,
        Data: item.createdAt,
      }));
      this.setState({ data: mappedData });
    } catch (error) {
      console.error("Houve um erro ao buscar os dados:", error);
    }
  };

  render() {
    return (
      <div>
        <h1>Intervalo de Datas</h1>
        <DateRangePickerComponent
          placeholder="Selecione o Intervalo de Datas"
          format="dd/MM/yyyy"
          onChange={this.onDateRangeChange}
          value={this.state.dateRange}
        />
        <GridComponent
          dataSource={this.state.data}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          pageSettings={{ pageSize: 10 }}
          allowResize={true}
          style={{ marginTop: "2rem" }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="Microcontrolador"
              headerText="Microcontrolador"
              width="150"
              textAlign="Center"
            />
            <ColumnDirective
              field="Sensor"
              headerText="Sensor"
              width="150"
              textAlign="Center"
            />
            <ColumnDirective
              field="Medida"
              headerText="Medida"
              width="100"
              textAlign="Center"
            />
            <ColumnDirective
              field="Data"
              headerText="Data"
              width="200"
              textAlign="Center"
              format={{ type: "dateTime" }}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Resize]} />
        </GridComponent>
      </div>
    );
  }
}

export default SensorDataGrid;
