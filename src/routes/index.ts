import GenDocs from '../pages/generate';
import Preview from '../pages/preview';
import NotFound from '../pages/notFound';

export const routes: Array<RouteObject> = [
    {
    name: 'home',
    component: GenDocs,
    exact: true,
    path: '/',
    authType: 'unAuthenticated',
    redirectTo: '/'
},
{
    name: 'preview',
    component: Preview,
    exact: true,
    path: '/preview',
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