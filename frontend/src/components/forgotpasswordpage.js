import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/request-reset-password`, { email });
      alert('E-mail de redefinição enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      alert('Erro ao enviar a solicitação de redefinição de senha.');
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h5" align="center">
        Redefinição de Senha
      </Typography>
      <StyledTextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
      >
        Enviar E-mail de Redefinição
      </Button>
    </StyledContainer>
  );
}

export default ResetPasswordPage;
