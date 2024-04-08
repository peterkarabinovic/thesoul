
export function wrapWithLogger(log: { log?: Function, info?: Function }) {

    const logger = (msg: string) => log.info ? log.info(msg) : ( log.log ? log.log(msg) : console.log(msg) );

    return function<T extends Record<string, any>>(obj: T): T {
        return new Proxy(obj, {
            get(target, prop: string, receiver) {
              const value = target[prop];
              if (value instanceof Function) {
                return function (this:T, ...args: any[]) {
                  const t = Date.now();  
                  logger( "Start " + value.name);
                  const self = this;  
                  const isAsync = value[Symbol.toStringTag] === "AsyncFunction";
                  if(isAsync)
                    return value.apply(this === receiver ? target : this, args)
                        .then( (res:unknown) => {
                            const t2 = Date.now();
                            logger( "End " + value.name + " in " + (t2-t) + "ms");
                            return res;
                        })
                  else {
                    const res = value.apply(this === receiver ? target : this, args);
                    const t2 = Date.now();
                    logger( "End " + value.name + " in " + (t2-t) + "ms");
                    return res;
                  }      
                };
              }
              return value;
            },
        });        
    }
}

