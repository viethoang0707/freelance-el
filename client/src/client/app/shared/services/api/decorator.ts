import from '../../helpers/reflect';

export class MethodRegister
{
    private static _instance: MethodRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new MethodRegister());
    }

    public register(method, ctor) {
        this.registry[method] = ctor;
      }

    public lookup(method) {
        return this.registry[method];
      }

     public instantiateObject(method):any {
        var ctor = this.registry[method];
        return ctor ? new ctor() : null;
      }
}


/* Model decorator */
export const METHOD_METADATA_KEY = Symbol("method");

export function Method( model: string) {
    return (ctor: Function) => {
        MethodRegister.Instance.register(model,ctor);
        Reflect.defineMetadata(METHOD_METADATA_KEY, model, ctor);
    }
}