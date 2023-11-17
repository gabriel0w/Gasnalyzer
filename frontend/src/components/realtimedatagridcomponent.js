import React, { Component } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Resize } from '@syncfusion/ej2-react-grids';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = `${process.env.REACT_APP_SOCKET}`;
const SENSOR_NAMES = {
  1: 'Temperatura',
  3: 'Umidade',
  4: 'Gás Inflamável',
  2: 'Monóxido de Carbono'
};

class RealTimeSensorDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] // initializing as empty
    };
    this.socket = null;
  }

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);

    this.socket.on('newData', (sensorData) => {
      const formattedData = sensorData.map(data => ({
        sensor: SENSOR_NAMES[data.id] || 'Desconhecido',
        measure: data.value,
        date: new Date().toLocaleString()
      }));

      // Use the functional form of setState to correctly update state based on previous state
      this.setState((prevState) => {
        const newData = [...prevState.data, ...formattedData];
        console.log(newData);
        return { data: newData };
      }, () => {
        this.forceUpdate(); // Força a renderização do componente
      });
    });

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    return (
      <div>
        <h1>Tabela de dados em tempo real</h1>
        <GridComponent dataSource={this.state.data}
                       allowPaging={true}
                       allowSorting={true}
                       allowFiltering={true}
                       pageSettings={{ pageSize: 10 }}
                       allowResize={true}>
          <ColumnsDirective>
            <ColumnDirective field='sensor' headerText='Sensor' width='150' textAlign='Center'/>
            <ColumnDirective field='measure' headerText='Medida' width='100' textAlign='Center' type='number'/>
            <ColumnDirective field='date' headerText='Data' width='200' textAlign='Center' format={{type: 'dateTime'}}/>
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Resize]} />
        </GridComponent>
      </div>
    );
  }
}

export default RealTimeSensorDataGrid;
