import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Modificado aqui

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#2E3B55",
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

export default function Header() {
  const navigate = useNavigate(); // Modificado aqui

  const handleLoginClick = () => {
    navigate("/login"); // Modificado aqui
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Title variant="h6">Gasnalyzer</Title>
        <Button
          onClick={handleLoginClick}
          color="inherit"
          startIcon={<AccountCircle />}
        >
          Login
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}
