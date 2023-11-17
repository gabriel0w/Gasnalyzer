import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import axios from 'axios';

function ResetPasswordPage() {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Senhas não correspondem');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
        resetToken,
        newPassword
      });

      setMessage(response.data.message || 'Senha redefinida com sucesso!');

      // Caso de sucesso: Redireciona para a página de login após 3 segundos.
      if(response.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }

    } catch (error) {
      setMessage(error.response?.data.message || 'Erro ao redefinir senha');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">Redefinição de Senha</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nova Senha"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirmar Nova Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
          >
            Redefinir Senha
          </Button>
        </Grid>
        <Grid item xs={12}>
          {message && <Typography variant="body2" align="center">{message}</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ResetPasswordPage;
