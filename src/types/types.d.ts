
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

type MrQueries = Record<string, string>[];
type Params = string[]
type RequestData = {
    method: Method;
    baseUrl: string;
    path?: string;
    payload?: any;
    headers?: Record<string, string>;
    queries?: MrQueries
    params?: Params;
}
type Queries = { name: string; value: string; staticField: string[] };
type K = keyof Omit<Queries, "staticField">;
type Authd = { use: boolean, position: number }
type ResponseData = {code: number, description: string, res: any}
interface RequestConfiguration {
    baseUrl: string;
    headers?: Record<string, string>;
    requestQueries?: Queries[];
    requestParams?: string[];
    authd: Authd;
    method: string;
    path?: string;
    requestBody?: Record<string, any>;
    description?: string;
    tags: string[];
    summary: string;
    operationId: string;
    name: string;
    responses: ResponseData[],
    mid?: number
  }

type Tag = { name: string; description: string };
