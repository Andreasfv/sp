export enum ErrorType {
  Unknown,
  NotFound,
  BadInput,
  InvalidCredentials,
  Unauthorized,
  Unauthenticated,
}

export interface BllError {
  type: ErrorType
  description?: string
}

export class BllResult<T> {
  private readonly result: T | null
  private readonly error: BllError | null

  constructor(result: T | null = null, error: BllError | null = null) {
    if (result === null && error === null) {
      throw new Error(
        'Error creating BllResult: both result and error are null',
      )
    }
    this.result = result
    this.error = error
  }

  isOk(): boolean {
    return this.error === null
  }

  isError(): boolean {
    return this.error !== null
  }

  get(): T | null {
    return this.result
  }

  getOrThrow(): T {
    if (this.isError()) {
      throw new Error(this.error?.description)
    }
    return this.result!
  }

  getOrElse(defaultValue: T): T {
    return this.result || defaultValue
  }
}

export type BllPromise<T> = Promise<BllResult<T>>

export function Ok<T>(result: T): BllResult<T> {
  return new BllResult<T>(result, null)
}

export function Fail<T>(error: BllError): BllResult<T> {
  return new BllResult<T>(null, error)
}
