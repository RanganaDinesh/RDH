import React, { useState } from 'react';
import './menu.css';
import Lottie from 'react-lottie';
import cardimg from '../assets/tables.json'; // Adjust path to your JSON file
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const Menu = () => {
  const [selectedTable, setSelectedTable] = useState('dine-1'); // State to track the selected table

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cardimg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value); // Update the selected table based on user selection
  };

  const handleOrder = () => {
    // Send the selected table number as a prop or handle it as required
    console.log(`Selected Table: ${selectedTable}`);
    // You can call a function here to handle the order
  };

  return (
    <div className='menu_container'>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label" style={{color:"orange" , fontWeight:"bold"}}>Book Your Dining</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="dine-1"
          name="radio-buttons-group"
          onChange={handleTableChange} // Handle change for the radio buttons
          style={{ display: 'flex', flexDirection: 'row' }} // Align radio buttons in a row
        >
          {Array.from({ length: 6 }, (_, index) => {
            const tableValue = `dine-${index + 1}`;
            return (
              <div className='menu_items' key={tableValue} style={{ backgroundColor: selectedTable === tableValue ? 'orange' : 'transparent' }}>
                <FormControlLabel value={tableValue} control={<Radio />} label={`Table - ${index + 1}`} />
                <Lottie options={defaultOptions} height={100} width={100} />
              </div>
            );
          })}
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleOrder} style={{backgroundColor:"orange"}}>
          Order
        </Button>
      </FormControl>
    </div>
  );
};

export default Menu;
