import React, { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  marginTop: "50px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login"); // Navega para a página de registro
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Configurações da requisição
    const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/users`;
    const userData = {
      email: email,
      senha: password,
      telefone: phone,
    };

    try {
      const response = await axios.post(apiEndpoint, userData);
      console.log("Usuário registrado com sucesso:", response.data);
      // Aqui você pode redirecionar o usuário ou alterar o estado da aplicação conforme necessário
    } catch (error) {
      // Se houver um erro na resposta da API
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo de 2xx
        console.error("Falha no registro:", error.response.data);
        alert(`Erro: ${error.response.data.message}`);
      } else {
        // Erro na configuração da requisição ou algo aconteceu na configuração da rede
        console.error("Erro na requisição:", error.message);
        alert("Erro ao enviar a solicitação de registro " + error.message);
      }
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">
        Cadastro
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Telefone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={goToLogin}
          >
            Já tem uma conta? Entrar
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default RegisterPage;
