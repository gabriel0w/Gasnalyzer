import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  DateTime,
  Inject,
  Legend
} from '@syncfusion/ej2-react-charts';

const ENDPOINT = `${process.env.REACT_APP_API_URL}`;

class RealTimeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: [],
      umidade: [],
      gasInflamavel: [],
      monoxidoDeCarbono: [],
    };
  }

  componentDidMount() {
    this.socket = socketIOClient(ENDPOINT);

    this.socket.on('newData', (sensorData) => {
      const newState = {};

      sensorData.forEach(data => {
        const { id, value } = data;
        const timestamp = new Date();
        const newDataPoint = { x: timestamp, y: value };

        switch (id) {
          case 1: // Substitua por 1 se SENSOR_IDS não estiver definido
            newState.temperatura = [newDataPoint, ...this.state.temperatura.slice(0, 10)];
            break;
          case 3: // Substitua por 3
            newState.umidade = [newDataPoint, ...this.state.umidade.slice(0, 10)];
            break;
          case 4: // Substitua por 4
            newState.gasInflamavel = [newDataPoint, ...this.state.gasInflamavel.slice(0, 10)];
            break;
          case 2: // Substitua por 2
            newState.monoxidoDeCarbono = [newDataPoint, ...this.state.monoxidoDeCarbono.slice(0, 10)];
            break;
          default:
            break;
        }
      });

      this.setState(newState);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    const { temperatura, umidade, gasInflamavel, monoxidoDeCarbono } = this.state;

    return (
      <div>
        <h1>Gráfico de dados em tempo real</h1>
        <ChartComponent
          id="real-time-chart"
          primaryXAxis={{ valueType: 'DateTime', labelFormat: 'hh:mm:ss' }}
          primaryYAxis={{ labelFormat: '{value}' }}
          legendSettings={{ visible: true }}
          style={{ width: '100%', height: '100%', minWidth: '300px', minHeight: '300px' }}
        >
          <Inject services={[LineSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={temperatura}
              name="Temperatura"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="red"
            />
            <SeriesDirective
              dataSource={umidade}
              name="Umidade"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="blue"
            />
            <SeriesDirective
              dataSource={gasInflamavel}
              name="Gás Inflamável"
              xName="x"
              yName="y"
              type="Line"
              marker={{ visible: true }}
              fill="green"
            />
            <SeriesDirective
              dataSource={monoxidoDeCarbono}
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

export default RealTimeChart;
