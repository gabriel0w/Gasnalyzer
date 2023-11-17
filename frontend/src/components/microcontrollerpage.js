import React, { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const getToken = () => localStorage.getItem("token");

function RegisterMicrocontrollerPage() {
  const [tipoChip, setTipoChip] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [idChip, setIdChip] = useState("");

  const handleRegister = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/microcontroladores/create`;
    const microcontrollerData = {
      tipo_chip: tipoChip,
      Localizacao: localizacao,
      id_chip: idChip,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };

    try {
      const response = await axios.post(apiEndpoint, microcontrollerData, config);
      console.log("Microcontrolador registrado com sucesso:", response.data);
      // Ações pós-registro (como redirecionamentos ou atualizações de estado)
    } catch (error) {
      console.error("Erro no registro do microcontrolador:", error);
      alert("Erro ao registrar o microcontrolador: " + error.message);
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">
        Registro de Microcontrolador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Tipo do Chip"
            variant="outlined"
            value={tipoChip}
            onChange={(e) => setTipoChip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Localização"
            variant="outlined"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="ID do Chip"
            variant="outlined"
            value={idChip}
            onChange={(e) => setIdChip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Registrar Microcontrolador
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default RegisterMicrocontrollerPage;
