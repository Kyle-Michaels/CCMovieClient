import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css'


const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApplication />);