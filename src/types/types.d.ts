
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

type Queries = Record<string, string>[];
type Params = string[]
type RequestData = {
    method: Method;
    baseUrl: string;
    path: string;
    payload?: any;
    headers?: Record<string, string>;
    queries?: Queries
    params?: Params;
}