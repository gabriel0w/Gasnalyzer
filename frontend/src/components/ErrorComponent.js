import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ErrorComponent = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (message) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5 segundos
    }

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null; // Não renderizar se não estiver visível

  return (
    <div style={{
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out'
    }}>
      {message}
    </div>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;
