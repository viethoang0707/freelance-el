import { BaseModel } from './base.model';

export class ModelRegister
{
    private static _instance: ModelRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new ModelRegister());
    }

    public register(model, ctor) {
        this.registry[model] = ctor;
      }

    public lookup(model) {
        return this.registry[model];
      }

     public instantiateObject(model):any {
        var ctor = this.registry[model];
        return ctor ? new ctor() : null;
      }
}


/* Model decorator */
export const MODEL_METADATA_KEY = Symbol("model");

export function Model( model: string) {
    return (ctor: Function) => {
        ModelRegister.Instance.register(model,ctor);
        Reflect.defineMetadata(MODEL_METADATA_KEY, model, ctor);
    }
}


/* Field decorator */
export interface IJsonMetaData<T> {
    name?: string,
    clazz?: {new(): T}
}

export const JSON_METADATA_KEY = "jsonProperty";

export function JsonProperty<T>(metadata?:IJsonMetaData<T>|string): any {
    if (metadata instanceof String || typeof metadata === "string"){
        return Reflect.metadata(JSON_METADATA_KEY, {
            name: metadata,
            clazz: undefined
        });
    } else {
        let metadataObj = <IJsonMetaData<T>>metadata;
        return Reflect.metadata(JSON_METADATA_KEY, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }
}


