import React, { useState, useEffect } from "react";
import { Checkbox, Button, Grid, Container, Typography, FormControl, FormControlLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledFormControl = styled(FormControl)({
  marginBottom: "20px",
  minWidth: 120,
});

function NotificationSettingPage() {
  const [sensores, setSensores] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState("");
  const [notificar, setNotificar] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/sensores`)
      .then(response => {
        setSensores(response.data);
      })
      .catch(error => console.error("Erro ao carregar sensores", error));
  }, []);

  const handleRegisterNotification = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/usuarioSensor`;
    const notificationData = {
      sensorId: selectedSensor,
      notificar: notificar,
    };

    try {
      await axios.post(apiEndpoint, notificationData);
      alert("Preferência de notificação registrada com sucesso");
      // Ações pós-registro (como redirecionamentos ou atualizações de estado)
    } catch (error) {
      console.error("Erro ao registrar a notificação:", error);
      alert("Erro ao registrar a notificação: " + error.message);
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">
        Configuração de Notificações de Sensor
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledFormControl fullWidth>
            <Select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecione um Sensor
              </MenuItem>
              {sensores.map((sensor) => (
                <MenuItem key={sensor.id} value={sensor.id}>
                  {sensor.nome} {/* Assumindo que os sensores têm um campo 'nome' */}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={notificar}
                onChange={(e) => setNotificar(e.target.checked)}
              />
            }
            label="Notificar quando fora dos limites"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegisterNotification}
          >
            Registrar Notificação
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default NotificationSettingPage;
