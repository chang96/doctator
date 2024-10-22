import configjson from '../sampleData/config.json'
import pathsjson from '../sampleData/paths.json'
export const isLocalhost = () =>
  Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

export const extractParams = (params?: string[]) => {
  if (!params) return ""
  return params.reduce((acc, param) => {
    const [, value] = param.split('.')
    return acc+"/"+value
  }, "")
}

export const extractQueries = (queries?: Queries[]) => {
  if (!queries || queries.length === 0) return ""
  const querystr = "?" + queries.reduce((acc, query) => {
    return acc + `${query.name}=${query.value}&`
  }, "").slice(0, -1)
  return querystr
}

export const getSampleData = (selector: "/samplepath" | "/sampleconfig") => {
  const c = {
    "/samplepath": pathsjson,
    "/sampleconfig": configjson
  }
  return c[selector]
}