import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Global from '../../assets/styles/global';
import { theme } from '../../assets/styles/theme/default';
import Routes from '../../Routes';

import Header from '../Header';
import { Container } from './styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global />

        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
