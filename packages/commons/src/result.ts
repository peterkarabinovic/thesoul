type Success<D> = {
    readonly success: true;
    readonly data: D;
};

type Failure<E> = {
    readonly success: false;
    readonly error: E;
};


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
    export function of<T>(data: T): Success<T> {
        return { success: true, data };
    }

    export function failure<E = never>(error: E): Failure<E> {
        return { success: false, error };
    }

    export function tryCatch<T = never, E = never>(fn: () => T, handler: (_: unknown) => E): Result<T, E> {
        try {
            return of(fn());
        } catch (err) {
            return failure(handler(err));
        }
    }

    export function map<A, B, E>(fn: (a: A) => B): (res: Result<A, E>) => Result<never | B, E> {
        return res => {
            if (res.success)
                return { ...res, data: fn(res.data) }
            return res
        }
    }

    export function chain<A, B, E>(fn: (a: A) => Result<B, E>): <EE>(res: Result<A, EE>) => Result<B, E|EE> {
        return res => {
            if (res.success)
                return fn(res.data);
            return res;
        }
    }

    export function fold<A,E,R>( onSuccess: (a:A) => R, onError: (e:E) => R): (ta: Result<A,E>) => R {
        return (res) => res.success ?  onSuccess(res.data) : onError(res.error);
    }

}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AsyncResult {

    export function of<T>(data: T): Promise<Success<T>> {
        return Promise.resolve(Result.of(data));
    }

    export function failure<E = never>(error: E): Promise<Failure<E>> {
        return Promise.resolve(Result.failure(error));
    }

    export function toPromise<A, E>(res: Promise<Result<A, E>>): Promise<A> {
        return res.then( r => r.success ? Promise.resolve(r.data) : Promise.reject(r.error) );
    }

    export function chain<A,B,E>(fn: (a:A) => Promise<Result<B,E>> ): <EE>(res: Promise<Result<A, EE>>) => Promise<Result<B, E|EE>> {
        return res => res.then( async r => r.success ? fn(r.data) : r );
    }

    export function map<A,B,E>(fn: (a:A) => B): (res: Promise<Result<A, E>>) => Promise<Result<B, E>> {
        return res => res.then( r => r.success ? Result.of(fn(r.data)) : r );
    }

    export function tap<A,E>( fn: (a:A) => void ): (res: Promise<Result<A, E>>) => Promise<Result<A, E>> {
        return res => res.then( r => { 
            if(r.success) 
                fn(r.data); 
            return r 
        });
    }

    export function tapError<E>( fn: (e:E) => void ): <A>(res: Promise<Result<A, E>>) => Promise<Result<A, E>> {
        return res => res.then( r => { 
            if(!r.success) 
                fn(r.error); 
            return r 
        });
    }

    export function then(fn: () => void): <A, E>(res: Promise<Result<A, E>>) => Promise<Result<A, E>> {
        return res => res.then(r => { fn(); return r; });
    }

    export function sequence<A,E>( lazyResults: NonEmptyArray<() => AsyncResult<A, E>> ): Promise<Result<A[], E>>{

        let [first, ...rest] = lazyResults;

        const firstAsynResult = AsyncResult.map<A,A[],E>( res => [res] )(first());

        return rest.reduce( (asynResult, nextLazyFn) => {
            return pipe(
                asynResult,
                chain( async resList => pipe(
                    nextLazyFn(),
                    map( res => resList.concat(res) )
                ) )
            )
        }, firstAsynResult )
    }
}

export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type Result<T, E> = Success<T> | Failure<E>;

export type NonEmptyArray<T> = [T, ...T[]];

export function isNotEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
    return arr?.length > 0;
}


/* eslint-disable @typescript-eslint/ban-types */
/**
 *  pipe
 * 
 *  Taken from fp-ts library
 *  (https://github.com/gcanti/fp-ts/blob/master/src/function.ts)
 * 
 */

export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O
): O

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P
): P

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q
): Q

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R
): R

export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S
): S
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K,
  kl: (k: K) => L,
  lm: (l: L) => M,
  mn: (m: M) => N,
  no: (n: N) => O,
  op: (o: O) => P,
  pq: (p: P) => Q,
  qr: (q: Q) => R,
  rs: (r: R) => S,
  st: (s: S) => T
): T

export function pipe(
  a: unknown,
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function,
  jk?: Function,
  kl?: Function,
  lm?: Function,
  mn?: Function,
  no?: Function,
  op?: Function,
  pq?: Function,
  qr?: Function,
  rs?: Function,
  st?: Function
): unknown {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab!(a)
    case 3:
      return bc!(ab!(a))
    case 4:
      return cd!(bc!(ab!(a)))
    case 5:
      return de!(cd!(bc!(ab!(a))))
    case 6:
      return ef!(de!(cd!(bc!(ab!(a)))))
    case 7:
      return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8:
      return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9:
      return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    case 10:
      return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))
    case 11:
      return jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))
    case 12:
      return kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))
    case 13:
      return lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))
    case 14:
      return mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))
    case 15:
      return no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))
    case 16:
      return op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))
    case 17:
      return pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))))
    case 18:
      return qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))))
    case 19:
      return rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))))))))))))
    case 20:
      return st!(rs!(qr!(pq!(op!(no!(mn!(lm!(kl!(jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))))))))))))))
  }
  return
}