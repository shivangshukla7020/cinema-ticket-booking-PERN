// main.jsx
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import store from './redux/store'; // make sure your store is correctly exported

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
