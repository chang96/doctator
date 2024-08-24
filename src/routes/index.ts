import App from '../App';
import NotFound from '../pages/notFound';

export const routes: Array<RouteObject> = [
    {
    name: 'home',
    component: App ,
    exact: true,
    path: '/',
    authType: 'unAuthenticated',
    redirectTo: '/'
},
{
    name: 'not found',
    component: NotFound ,
    exact: true,
    path: '*',
    authType: 'unAuthenticated',
    redirectTo: '/'
},
]

export const validRoutes: Array<string> = routes.map(r=> r.path)