export class CourseUnitRegister
{
    private static _instance: CourseUnitRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new CourseUnitRegister());
    }

    public register(type, ctor) {
        this.registry[type]=ctor;
      }

    public lookup(type) {
        return this.registry[type];
      }
}


export function CourseUnitTemplate( args: any) {
    return (ctor: Function) => {
        CourseUnitRegister.Instance.register( args.type,ctor);
    };
}

