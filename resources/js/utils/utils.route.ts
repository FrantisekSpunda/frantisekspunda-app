import { ParsedUrlQuery } from "querystring";

/**
 * Function to get single page route
 * 
 * @param params: SSR params to get single route
 */
export const getRoute = (params?: ParsedUrlQuery ) => {
  const path = (params?.route instanceof Array
    ? params.route.join('/')
    : params?.route) || ''
    
  return '/' + (path === 'index' ? '' : path)
}