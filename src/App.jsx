import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// @mui date-pickers
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const App = () => (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )

export default App
