export class Player {
    constructor(public id:string, public name:string, public age:number, public pos:Position,
        public team:string, public league:string, public numOfGoals:number) {
    }
}

export namespace Position{
   export function options() {
        return Object.keys(Position).filter((type) => isNaN(<any>type) && type !== 'options');
    }
}

export enum Position {
    RW,
ST,
LW,
CM,
CAM,
CDM,
LB,
CB,
RB,
GK
}