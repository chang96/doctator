import { BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes";
import RouteManager from "./routeManager";
import { Provider } from "react-redux";
import store  from "./store/store";
function App() {
  const documentId = new URLSearchParams(window.location.search).get("id"); 
 
  return (
    <Provider store={store}>
      <Router>
        <Routes>{routes.map((r) => RouteManager(r, documentId))}</Routes>
      </Router>
    </Provider>
  );
}

export default App;
