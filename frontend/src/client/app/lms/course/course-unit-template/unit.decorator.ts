export class CourseUnitPlayerRegister
{
    private static _instance: CourseUnitPlayerRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new CourseUnitPlayerRegister());
    }

    public register(type, ctor) {
        this.registry[type]=ctor;
      }

    public lookup(type) {
        return this.registry[type];
      }
}


export function CourseUnitPlayerTemplate( args: any) {
    return (ctor: Function) => {
        CourseUnitPlayerRegister.Instance.register( args.type,ctor);
    };
}

