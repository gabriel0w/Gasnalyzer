import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      // O Axios já processa a resposta JSON, então você pode acessar diretamente
      saveToken(response.data.token);

      // Navegue para outra página após o login, se necessário
      navigate('/charts');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  const goToRegister = () => {
    navigate('/register');  // Navega para a página de registro
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password'); // Navega para a página "Esqueci minha senha"
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">Login</Typography>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={goToRegister}
          >
            Cadastre-se
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={goToForgotPassword}  // Adicione o evento aqui
          >
            Esqueceu a senha?
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default LoginPage;
