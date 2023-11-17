import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import MainContent from './components/maincontent';
import LoginPage from './components/loginpage'; // Seu componente de página de login
import ForgotPasswordPage from './components/forgotpasswordpage';
import RegisterPage from './components/registerpage';
import ResetPasswordPage from './components/resetpasswordpage';
import ChartsPage from './components/chartpage';
import MicroControllerPage from './components/microcontrollerpage';
import SensorPage from './components/sensorpage';
import SensorNotificationPage from './components/sensornotificationpage';
import RegisterDataPage from './components/registerdatapage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/register-micro" element={<MicroControllerPage />} />
          <Route path="/register-sensor" element={<SensorPage />} />
          <Route path="/sensor-notification" element={<SensorNotificationPage />} />
          <Route path="/register-data" element={<RegisterDataPage />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
