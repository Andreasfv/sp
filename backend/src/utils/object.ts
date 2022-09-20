type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
  ? T
  : {
      [K in keyof T]: T[K] extends (infer U)[]
        ? RecursivelyReplaceNullWithUndefined<U>[]
        : RecursivelyReplaceNullWithUndefined<T[K]>
    }

export function convertNullsToUndefined<T>(
  obj: T,
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null) {
    return undefined as any
  }

  // Ignore "constructor" not found issue. All variables will have this property.
  // @ts-ignore
  if (obj.constructor.name === 'Object') {
    for (let key in obj) {
      obj[key] = convertNullsToUndefined(obj[key]) as any
    }
  }
  return obj as any
}
