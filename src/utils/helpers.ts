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

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function returnTextColor(text: string, backgroundColor: boolean=false){
  let color = ""
  const colorMap: Record<string, string> = {
    "get": "brown",
    "post": "gray",
    "put": "green",
    "patch": "purple",
    "option": "violet",

    "string": "green",
    "array": "purple",
    "object": "violet",
    "number": "brown",
    "enum": "gray",
    "[]string": "green"
  }

  const bgMap: Record<string, string> = {
    "brown": "rgb(196, 164, 132)",
    "orange": "rgb(255, 213, 128)",
    "green": "#90EE90",
    "pink": "#FFB6C1",
    "blue": "#add8e6",
    "gray": "#D3D3D3",
    "purple": "#CBC3E3",
    "#f0809c": "#f09380",
    "violet": "#CF9FFF"
  }
  color = colorMap[text]

  if (color === "") {
    color = "violet";
  }

  if (backgroundColor){
   color = bgMap[color]
  }
  return color === "green" ? "rgb(6, 247, 118)" : color
}

export function returnType (value: any): string {
  const type = typeof value
  if (type === "string" && (value as string).split(":").length > 1) {
    const enums = (value as string).split(":")
    if (enums.at(-1) === ".") enums.pop()
    return `enum`
  }
  if (type === "object" && Array.isArray(value)) {
    if (value[0]){
      const res = [] as any[]
      value.forEach(k => {
        const t = typeof k
        if (!res.includes(t)) res.push(t)
      })
      return `[]${res.join(" | ")}`
    }
    return "[]"
  } 
  return type.toLowerCase()
}

