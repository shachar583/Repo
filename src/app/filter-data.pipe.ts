import { Player } from './models/player';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {
  filterMethods = filterMethods;
  transform(players:Player[], filterField:string, filter:string):Player[] {
    
    // #region pick filter method
    var filterMethod = filterMethods.name;
    switch (filterField) {
      case "name":
        filterMethod = filterMethods.name;
        break;
      case "age":
        filterMethod = filterMethods.age;
        break;
      case "goals":
         filterMethod = filterMethods.goals;
        break;
      case "league":
        filterMethod = filterMethods.league;
        break;
      case "position":
         filterMethod = filterMethods.pos;
        break;
      case "team":
        filterMethod = filterMethods.team;
        break;
    }
    //#endregion

    if (!filterField || !filter) return players;
        if (typeof players === 'object') {
            var resultArray = [];
      
            for (let player of players) {
               if (filterMethod(player,filter)) {
                   resultArray.push(player);
               }
            }
           return resultArray;
        }
        else {
            return null;
        }
    }
}

export namespace filterMethods {
  export const goals = (player,fil) => {
    return player.numOfGoals == fil;
  }
  
  export const   age = (player,fil) => {
    return player.age == fil;
  }
  export const name = (player,fil) => {
    return player.name.toLowerCase().includes(fil.toLowerCase());
  }
  
  export  const league = (player,fil) => {
    return player.league.toLowerCase().includes(fil.toLowerCase());
  }
  
  export const   pos = (player,fil) => {
    return player.pos.toLowerCase().includes(fil.toLowerCase());
  }
  
  export const  team = (player,fil) => {
    return player.team.toLowerCase().includes(fil.toLowerCase());
  }
}