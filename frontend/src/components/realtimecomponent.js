import React, { Component } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  LineSeries,
  DateTime,
  Inject,
  Legend
} from '@syncfusion/ej2-react-charts';

class RealTimeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    // Iniciar a atualização de dados em tempo real simulados
    this.startMockDataUpdate();
  }

  componentWillUnmount() {
    // Parar a atualização de dados simulados quando o componente for desmontado
    clearInterval(this.mockDataInterval);
  }

  startMockDataUpdate() {
    // Simulação de dados em tempo real a cada segundo
    this.mockDataInterval = setInterval(() => {
      const timestamp = new Date();
      const newDataPoint = {
        x: timestamp,
        temperature: Math.floor(Math.random() * 100),
        humidity: Math.floor(Math.random() * 100),
        flammableGas: Math.floor(Math.random() * 100),
        carbonMonoxide: Math.floor(Math.random() * 100),
      };

      // Adicionar a nova atualização ao início do array e manter apenas as últimas 30 atualizações
      this.setState((prevState) => ({
        data: [newDataPoint, ...prevState.data.slice(0, 10)],
      }));
    }, 1000);
  }

  render() {
    const { data } = this.state;

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
            {/* Temperatura */}
            <SeriesDirective
              dataSource={data}
              name="Temperatura"
              xName="x"
              yName="temperature"
              type="Line"
              marker={{ visible: true }}
              fill="red"
            />
            {/* Umidade */}
            <SeriesDirective
              dataSource={data}
              name="Umidade"
              xName="x"
              yName="humidity"
              type="Line"
              marker={{ visible: true }}
              fill="blue"
            />
            {/* Gás Inflamável */}
            <SeriesDirective
              dataSource={data}
              name="Gás Inflamável"
              xName="x"
              yName="flammableGas"
              type="Line"
              marker={{ visible: true }}
              fill="green"
            />
            {/* Monóxido de Carbono */}
            <SeriesDirective
              dataSource={data}
              name="Monóxido de Carbono"
              xName="x"
              yName="carbonMonoxide"
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
