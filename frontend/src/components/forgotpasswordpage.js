import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Aqui você pode adicionar a lógica de redefinição de senha ou chamada de API.
    console.log('Reset password for email:', email);
  };

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" align="center">Esqueci minha senha</Typography>
      <Typography variant="body1" align="center" style={{ marginBottom: '20px' }}>
        Insira seu e-mail e enviaremos um link para redefinir sua senha.
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
          >
            Enviar link de redefinição
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            //onClick={handleLogin}
          >
            Voltar para o login
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default ForgotPasswordPage;
