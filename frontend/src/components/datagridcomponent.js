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
// Importando Axios
// import axios from 'axios';
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
      data: [], // inicializando como vazio
      dateRange: [new Date(), new Date()],
    };
  }

  // Função para lidar com a mudança de intervalo de datas
  onDateRangeChange = (args) => {
    const startDate = args.value[0];
    const endDate = args.value[1];

    // Chamar função para buscar dados quando o backend estiver pronto
    // this.fetchNewData(startDate, endDate);
  };

  // Função esquematizada para buscar novos dados do backend
  fetchNewData = async (startDate, endDate) => {
    // URL do seu backend
    const apiUrl = "YOUR_BACKEND_ENDPOINT";

    // Descomente o trecho abaixo e ajuste conforme necessário quando o backend estiver pronto
    /*
    try {
      const response = await axios.get(apiUrl, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      this.setState({ data: response.data });
    } catch (error) {
      console.error('Houve um erro ao buscar os dados:', error);
    }
    */
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
          style = {{marginTop : '2rem'}}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="microcontroller"
              headerText="Microcontrolador"
              width="150"
              textAlign="Center"
            />
            <ColumnDirective
              field="sensor"
              headerText="Sensor"
              width="150"
              textAlign="Center"
            />
            <ColumnDirective
              field="max"
              headerText="Máximo"
              width="100"
              textAlign="Center"
              type="number"
            />
            <ColumnDirective
              field="min"
              headerText="Mínimo"
              width="100"
              textAlign="Center"
              type="number"
            />
            <ColumnDirective
              field="date"
              headerText="Data"
              width="200"
              textAlign="Center"
              type="datetime"
              format={{ type: "dateTime", format: "dd/MM/yyyy HH:mm:ss" }}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Resize]} />
        </GridComponent>
      </div>
    );
  }
}

export default SensorDataGrid;
