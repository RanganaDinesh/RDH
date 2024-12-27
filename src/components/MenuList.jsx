import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import jsPDF from "jspdf";
import { Transition } from "react-transition-group";
import { useParams } from 'react-router-dom';

const data = {
  "Food Orders": [
    { id: 1, name: "Burger", price: 150, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Pizza", price: 250, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Pasta", price: 200, image: "https://via.placeholder.com/150" },
  ],
  Grocery: [
    { id: 4, name: "Rice", price: 50, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Wheat", price: 40, image: "https://via.placeholder.com/150" },
  ],
  "Electronic Devices": [
    { id: 6, name: "Laptop", price: 50000, image: "https://via.placeholder.com/150" },
    { id: 7, name: "Smartphone", price: 15000, image: "https://via.placeholder.com/150" },
  ],
};

const UnifiedMenu = () => {
  const { code } = useParams(); // Retrieve the dynamic parameter from the route
  const [category, setCategory] = useState("Food Orders");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, category }]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 20);
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (${item.category}) - ₹${item.price}`, 20, 30 + index * 10);
    });
    doc.text(`Total: ₹${calculateTotal()}`, 20, 30 + cart.length * 10);
    doc.save("invoice.pdf");
  };

  return (
    <div style={{width:"100%" , height:"-webkit-fill-available"}}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {category} Items
          </Typography>
          <span style={{fontSize:"15px" , fontWeight:"bold"}}>Welcome {code}</span>
          <IconButton
            color="inherit"
            onClick={() => setCartOpen(true)}
            aria-label="View Cart"
            
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer with animation */}
      <Transition in={isDrawerOpen} timeout={300}>
        {(state) => (
          <Drawer
            anchor="left"
            open={state === "entered"}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              style: {
                transform:
                  state === "entering" || state === "entered"
                    ? "translateX(0)"
                    : "translateX(-100%)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <List>
              {Object.keys(data).map((categoryName) => (
                <ListItem
                  button
                  key={categoryName}
                  onClick={() => {
                    setCategory(categoryName);
                    setDrawerOpen(false); // Close after selection
                  }}
                >
                  <ListItemText primary={categoryName} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
      </Transition>

      {/* Items Grid */}
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {data[category].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Price: ₹{item.price}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(item)}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onClose={() => setCartOpen(false)} fullWidth>
        <DialogContent>
          <Typography variant="h6">Cart Details</Typography>
          {cart.length === 0 ? (
            <Typography>No items in the cart</Typography>
          ) : (
            cart.map((item, index) => (
              <Typography key={index}>
                {index + 1}. {item.name} ({item.category}) - ₹{item.price}
              </Typography>
            ))
          )}
          {cart.length > 0 && (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: ₹{calculateTotal()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Close</Button>
          <Button onClick={generateInvoice} variant="contained" color="primary" disabled={cart.length === 0}>
            Generate Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UnifiedMenu;
