import { NgForm } from '@angular/forms';
import { DataService } from './../data.service';
import { Player,Position } from './../models/player';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'players-table',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayerComponent implements OnInit {


players:Player[];
descend:boolean;
Position = Position;
filvalue:string = "";
SortMethods = SortMethods;

constructor(private db: DataService) {
  this.getPlayers();
  this.descend = false;
}

private getPlayers(){
  this.db.getPlayers().subscribe((players) => {
    this.players = new Array<Player>();
   players.map((player) => {
      this.players.push(new Player(player['id'],player['name'],player['age'],
      player['pos'],player['team'],player['league'],player['numOfGoals']));
    })
  });
}

  getFieldsFromTable(player,$event):void{
    this.db.setPlayerToUpdate(player);
    $event.stopPropagation();
  }

  remove(player,$event){
    $event.stopPropagation();
    this.db.deletePlayer(player);
    alert(player.name + 'has been removed');
  }

  sort(sortType) {
    var itemsToDisplay;
    this.players.sort(sortType);
     if (this.descend) {
       this.players.reverse();
     }
    this.descend = !this.descend;
}

search(filterMethod) {
}
  ngOnInit() {
  }
}

export namespace SortMethods{
  export const goals =  (a, b) => {
    return b.numOfGoals - a.numOfGoals;
  }

  export const age =  (a, b) => {
    return b.age - a.age;
  }

  export const pos =  (a, b) => {
    var posA = a.pos.toLowerCase();
    var posB = b.pos.toLowerCase();
    if (posA < posB) return -1;
    if (posA > posB) return 1;
    return 0;
  }

  export const name =  (a, b) => {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  export const league =  (a, b) => {
    var leagueA = a.league.toLowerCase();
    var leagueB = b.league.toLowerCase();
    if (leagueA < leagueB) return -1;
    if (leagueA > leagueB) return 1;
    return 0;
  }

  export const team =  (a, b) => {
    var teamA = a.team.toLowerCase();
    var teamB = b.team.toLowerCase();
    if (teamA < teamB) return -1;
    if (teamA > teamB) return 1;
    return 0;
  }
}