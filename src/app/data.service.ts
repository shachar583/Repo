import { Player } from './models/player';
import { Observable } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataService {
_update: boolean;
@Output() playerUpdate: EventEmitter<Player> = new EventEmitter();

  constructor(private db: AngularFireDatabase) { 
    this._update = false;
  }

  getPlayers(){
    return this.db.list('/players').valueChanges();
  }

  addPlayer(player){
    let key = this.db.list('/players').push(player).key
    player.id = key;
    console.log(player);
    this.db.object('/players/' + key + '/').set(player);
  }

  updatePlayer(player){
    this.db.object('/players/' + player.id + '/').set(player);
    }

  deletePlayer(player){
    this.db.object('/players/' + player.id + '/').remove();
  }

  setPlayerToUpdate(player){
    this.playerUpdate.next(player);
  }
}