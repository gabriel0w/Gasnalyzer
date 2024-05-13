import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorComponent from './ErrorComponent'; // Importe o componente de erro personalizado

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password
      });

      saveToken(response.data.token);
      navigate('/charts');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login falhou. Por favor, verifique suas credenciais e tente novamente.');
    }
  };

  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <StyledContainer maxWidth="xs">
      {error && <ErrorComponent message={error} />} {/* Renderize o componente de erro se houver um erro */}
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
            onClick={goToForgotPassword}
          >
            Esqueceu a senha?
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default LoginPage;
