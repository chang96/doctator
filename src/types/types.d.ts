
type RouteObject = {
    name: string;
    path: string;
    exact: boolean;
    component: React.ComponentType;
    authType: 'unAuthenticated' | 'authenticated';
    redirectTo?: string;
}

type State = {
    displayModal: boolean;
}

type ActionTypess = Action<string>
