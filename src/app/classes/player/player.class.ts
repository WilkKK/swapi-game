export class Player<T> {
    details: T | null = null;
    currentPoint: number = 0;
    private _name: string;
    constructor(name: string) {
      this._name = name;
    }
  
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
  }
 