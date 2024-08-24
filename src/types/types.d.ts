
type RouteObject = {
    name: string;
    path: string;
    exact: boolean;
    component: React.ComponentType;
    authType: 'unAuthenticated' | 'authenticated';
    redirectTo?: string;
}