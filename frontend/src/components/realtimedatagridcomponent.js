import React, { Component } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Resize } from '@syncfusion/ej2-react-grids';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';

class RealTimeSensorDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] // inicializando como vazio
    };
    this.websocket = null;
  }

  componentDidMount() {
    this.connectWebSocket();
  }

  connectWebSocket = () => {
    // Substitua 'YOUR_WEBSOCKET_ENDPOINT' pelo endpoint do seu WebSocket
    this.websocket = new WebSocket('ws://localhost:3001');

    this.websocket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      this.setState({ data: [...this.state.data, newData] });
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  };

  componentWillUnmount() {
    if (this.websocket) {
      this.websocket.close();
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
            <ColumnDirective field='microcontroller' headerText='Microcontrolador' width='150' textAlign='Center'/>
            <ColumnDirective field='sensor' headerText='Sensor' width='150' textAlign='Center'/>
            <ColumnDirective field='max' headerText='Máximo' width='100' textAlign='Center' type='number'/>
            <ColumnDirective field='min' headerText='Mínimo' width='100' textAlign='Center' type='number'/>
            <ColumnDirective field='date' headerText='Data' width='200' textAlign='Center' type='datetime' format={{type: 'dateTime', format: 'dd/MM/yyyy HH:mm:ss'}}/>
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Resize]} />
        </GridComponent>
      </div>
    );
  }
}

export default RealTimeSensorDataGrid;
