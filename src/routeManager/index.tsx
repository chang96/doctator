import { Route } from 'react-router-dom'
const renderRoute = (route: RouteObject, redirect?: boolean) => {

    if (redirect) {
        return (
            <Route
            key={route.name}
            path={route.redirectTo}
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


function RouteManager(route: RouteObject, token?: string) {
    const isAuthenticated = !!token;
    if (route.authType === 'authenticated' && isAuthenticated) {
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