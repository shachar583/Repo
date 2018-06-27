import { Player } from './models/player';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerUpdated(player: Player): void {
    console.log(player);
  }
}