import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import {Box, createTheme, CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px'
      // backgroundColor: '#282c34'
    }}>
      <App />
    </Box>
    </ThemeProvider>
  </StrictMode>,
)
