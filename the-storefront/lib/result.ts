type Success<D> = {
  readonly success: true;
  readonly data: D;
};

type Failure<E> = {
  readonly success: false;
  readonly error: E;
};

export namespace Result {
  export function of<T = never, E = never>(data: T): Result<T, E> {
    return { success: true, data };
  }

  export function failure<E>(error: E): Result<never, E> {
    return { success: false, error };
  }

  export function tryCatch<T = never, E = never>(fn: () => T, handler: (_: any) => E): Result<T, E> {
    try {
      return of(fn());
    } catch (err) {
      return failure(handler(err));
    }
  }
}

export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type Result<T, E> = Success<T> | Failure<E>;
