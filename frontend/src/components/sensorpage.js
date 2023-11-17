import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Container, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const StyledFormControl = styled(FormControl)({
  marginBottom: "20px",
  minWidth: 120,
});

function RegisterSensorPage() {
  const [microcontroladores, setMicrocontroladores] = useState([]);
  const [selectedMicrocontrolador, setSelectedMicrocontrolador] = useState("");
  const [unidMedida, setUnidMedida] = useState("");
  const [tipo, setTipo] = useState("");
  const [limiteMin, setLimiteMin] = useState("");
  const [limiteMax, setLimiteMax] = useState("");
  const [id_sensor, setIdSensor] = useState("");

  const getToken = () => localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/microcontroladores`, config)
      .then(response => {
        setMicrocontroladores(response.data);
      })
      .catch(error => console.error("Erro ao carregar microcontroladores", error));
  }, []);

  const handleRegister = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/sensores`;
    const sensorData = {
      id_sensor : id_sensor,
      unid_medida: unidMedida,
      tipo: tipo,
      Limite_min: limiteMin,
      Limite_Max: limiteMax,
      fk_id_microcontrolador: selectedMicrocontrolador,
    };

    try {
      await axios.post(apiEndpoint, sensorData, { headers: config.headers });
      alert("Sensor registrado com sucesso");
      // Ações pós-registro (como redirecionamentos ou atualizações de estado)
    } catch (error) {
      console.error("Erro no registro do sensor:", error);
      alert("Erro ao registrar o sensor: " + error.message);
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">
        Registro de Sensor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledFormControl fullWidth>
            <InputLabel id="microcontrolador-select-label">Microcontrolador</InputLabel>
            <Select
              labelId="microcontrolador-select-label"
              value={selectedMicrocontrolador}
              onChange={(e) => setSelectedMicrocontrolador(e.target.value)}
              label="Microcontrolador"
            >
              {microcontroladores.map((mc) => (
                <MenuItem key={mc.id_chip} value={mc.id_chip}>
                  {mc.tipo_chip} - {mc.Localizacao}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="ID"
            variant="outlined"
            value={id_sensor}
            onChange={(e) => setIdSensor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Unidade de Medida"
            variant="outlined"
            value={unidMedida}
            onChange={(e) => setUnidMedida(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Tipo"
            variant="outlined"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Limite Mínimo"
            type="number"
            variant="outlined"
            value={limiteMin}
            onChange={(e) => setLimiteMin(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Limite Máximo"
            type="number"
            variant="outlined"
            value={limiteMax}
            onChange={(e) => setLimiteMax(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Registrar Sensor
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default RegisterSensorPage;
