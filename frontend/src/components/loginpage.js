import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação ou chamada de API.
    console.log('Logging in with email:', email);
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
            //onClick={handleRegister}
          >
            Cadastre-se
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default LoginPage;
