import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledSelect = styled(Select)({
  marginBottom: "20px",
});

function DataEntryPage() {
  const [microcontroladores, setMicrocontroladores] = useState([]);
  const [selectedMicrocontrolador, setSelectedMicrocontrolador] = useState("");
  const [sensores, setSensores] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [unidade, setUnidade] = useState("");

  const getToken = () => localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/microcontroladores`, config)
      .then(response => setMicrocontroladores(response.data))
      .catch(error => console.error("Erro ao carregar microcontroladores", error));
  }, []);

  useEffect(() => {
    if (selectedMicrocontrolador) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/sensores/get-sensor-by-fk/${selectedMicrocontrolador}`, config)
        .then(response => setSensores(response.data))
        .catch(error => console.error("Erro ao carregar sensores", error));
    }
  }, [selectedMicrocontrolador]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/data`, {
        unidade: unidade,
        fk_id_sensor: selectedSensor,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert("Dado registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar dados:", error);
      alert("Erro ao registrar os dados.");
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">Registrar Dados</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledSelect
            fullWidth
            value={selectedMicrocontrolador}
            onChange={(e) => setSelectedMicrocontrolador(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Selecione um Microcontrolador</MenuItem>
            {microcontroladores.map(mc => (
              <MenuItem key={mc.id_chip} value={mc.id_chip}>{mc.tipo_chip}</MenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid item xs={12}>
          <StyledSelect
            fullWidth
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>Selecione um Sensor</MenuItem>
            {sensores.map(sensor => (
              <MenuItem key={sensor.id_sensor} value={sensor.id_sensor}>{sensor.tipo}</MenuItem>
            ))}
          </StyledSelect>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Unidade"
            variant="outlined"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Registrar
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default DataEntryPage;
