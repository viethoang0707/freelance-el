export class ChartRegister
{
    private static _instance: ChartRegister;
    private registry: any;

    private constructor()
    {
        this.registry = [];
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new ChartRegister());
    }

    public register(title, ctor) {
        this.registry.push({title: title, component: ctor}) ;
      }

    public entries() {
        return this.registry;
      }
}


export function Chart( args: any) {
    return (ctor: Function) => {
        ChartRegister.Instance.register( args.title,ctor);
    }
}

