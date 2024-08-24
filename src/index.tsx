import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import {routes} from './routes';
import RouteManager from './routeManager';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <Routes>{routes.map(r => RouteManager(r))}</Routes>
  </Router>
);

reportWebVitals(console.log);
