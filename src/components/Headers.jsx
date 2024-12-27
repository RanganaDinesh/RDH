// ShiningText.js
import React, { useState  } from 'react';
import './ShiningText.css';
import Lottie from 'react-lottie';
import welcomeAnimation from '../assets/img_v.json'; // Adjust path to your JSON file
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

const ShiningText = () => {
  
  const [name, setName] = useState('');
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const outerTheme = useTheme();
  const navigate = useNavigate();



  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: welcomeAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleLoginClick = () => {
    if (name === 'SURE&RDH') {
      navigate(`/dashboard/${name}`);
    } else {
      navigate(`/menulist/${name}`);
    }
  };

  return (
    <div>
      <div className=''>
        <h1 className="shining-text">Welcome <br />TO Digital Dining</h1>
        <Lottie options={defaultOptions} height={100} width={100} />
        <div className='header_container'>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 2 }}
          >
            <ThemeProvider theme={customTheme(outerTheme)} className='header_container'>
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </ThemeProvider>
          </Box>
        </div>
        <Button
          variant="contained"
          disableElevation
          style={{ backgroundColor: "orange", opacity: "0.8", height: "30px" }}
          onClick={handleLoginClick}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default ShiningText;
