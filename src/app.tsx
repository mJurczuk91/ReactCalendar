import './app.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import Datepicker from './features/datepicker';
import Calendar from './features/calendar';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Provider store={store}>
      <Dashboard>
        <Navbar>
          <Datepicker />
        </Navbar>
        <Calendar />
      </Dashboard>
    </Provider>
  );
}

export default App;
