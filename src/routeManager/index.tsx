import { Route } from 'react-router-dom'
import NotFound from '../pages/notFound';
const renderRoute = (route: RouteObject, redirect?: boolean) => {

    if (redirect) {
        return (
            <Route
            key={route.name}
            path={route.redirectTo}
            Component={NotFound}
          />
        )
    }
    return (
      <Route
        key={route.name}
        path={route.path}
        Component={route.component}
      />
    );
}


function RouteManager(route: RouteObject, referenceId: string | null, token?: string) {
    const isAuthenticated = !!token;
    if (!referenceId || referenceId === "" ){
      return renderRoute(route, true)
    }

    else if (route.authType === 'authenticated' && isAuthenticated) {
      return renderRoute(route);
    } else if (route.authType === 'authenticated' && !isAuthenticated) {
      return renderRoute(route, true);
    } else if (route.authType === 'unAuthenticated' && isAuthenticated) {
      return renderRoute(route, true);
    } else if (route.authType === 'unAuthenticated' && !isAuthenticated) {
      return renderRoute(route);
    } else {
      return renderRoute(route);
    }
  }
  
  export default RouteManager;