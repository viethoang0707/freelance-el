export class QuestionRegister
{
    private static _instance: QuestionRegister;
    private registry: any;

    private constructor()
    {
        this.registry = {};
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new QuestionRegister());
    }

    public register(type, ctor) {
        this.registry[type]=ctor ;
      }

    public lookup(type) {
        return this.registry[type];
      }
}


export function QuestionTemplate( args: any) {
    return (ctor: Function) => {
        QuestionRegister.Instance.register( args.type,ctor);
    };
}

