import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)({
  textAlign: 'center',
  paddingTop: '40px',
});

const WelcomeText = styled(Typography)({
  marginBottom: '20px',
});

export default function MainContent() {
  return (
    <StyledContainer>
      <WelcomeText variant="h4" component="h2">
        Welcome to Gasnalyzer
      </WelcomeText>
      <Typography variant="body1">
        The ultimate solution for analyzing gases.
      </Typography>
      <br />
      <Button variant="contained" color="primary">
        Learn More
      </Button>
    </StyledContainer>
  );
}
