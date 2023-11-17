import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#2E3B55",
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (isMounted) {
          setIsLoggedIn(false);
        }
        return;
      }

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/authenticate`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (isMounted) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro de autenticação", error);
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleMicrocontrollerClick = () => {
    navigate("/register-micro");
  };

  const handleSensorClick = () => {
    navigate("/register-sensor");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Title variant="h6">Gasnalyzer</Title>

        {isLoggedIn ? (
          <>
            <Button onClick={handleMicrocontrollerClick} color="inherit">
              Cadastrar Microcontrolador
            </Button>
            <Button onClick={handleSensorClick} color="inherit">
              Cadastrar Sensor
            </Button>
          </>
        ) : (
          <Button onClick={handleLoginClick} color="inherit" startIcon={<AccountCircle />}>
            Login
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}
