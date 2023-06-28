export * from "./tracks"
export * from "./browser"

export const ignoreCaseIndexOf = (arr: any[], lookup: any) => arr.findIndex(item => lookup.toLowerCase() === item.toLowerCase());