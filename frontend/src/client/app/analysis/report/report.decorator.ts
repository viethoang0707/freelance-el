export class ReportRegister
{
    private static _instance: ReportRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new ReportRegister());
    }

    public register(category, title, ctor) {
        if (!this.registry[category])
            this.registry[category] = [];
        this.registry[category].push({title: title, component: ctor}) ;
      }

    public lookup(category) {
        return this.registry[category];
      }
}


export function Report( args: any) {
    return (ctor: Function) => {
        ReportRegister.Instance.register(args.category, args.title,ctor);
    }
}

