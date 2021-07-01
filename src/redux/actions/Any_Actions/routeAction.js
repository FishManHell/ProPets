export const ROUTE = 'ROUTE';

export const routeAction = page => {
    return {
        type: ROUTE,
        payload: page
    }
}