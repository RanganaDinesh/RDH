import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import GridComponent from "./GridComponent"

// Define navigation items
const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

// Create demo theme
const demoTheme = createTheme({});



// interface DemoProps {
//   window?: () => Window; // Injected by the documentation to work in an iframe.
// }

// Main Dashboard Layout component
export default function DashboardLayoutBasic({ window }) {
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined; // Use window if provided

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
      <div className="container">
      <BoxContainer name="Dining available " count={10} />
      <BoxContainer name="Dining Filled " count={20} />
     </div>
      <div style={{padding:"30px"}}>
      <GridComponent/>
      </div>
      </DashboardLayout>
    </AppProvider>
  );
}
const BoxContainer = ({ name, count }) => {
  return (
    <div className="box">
      <div className="box-name">{name}</div>
      <div className="box-count">{count}</div>
    </div>
  );
};
