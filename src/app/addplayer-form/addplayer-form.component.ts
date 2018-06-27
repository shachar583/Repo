import { Observable } from 'rxjs';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Player, Position } from './../models/player';

@Component({
  selector: 'addplayer-form',
  templateUrl: './addplayer-form.component.html',
  styleUrls: ['./addplayer-form.component.css']
})

export class AddPlayerFormComponent implements OnInit {
  update:boolean;
  key: string;
  minAge = 16;
  maxAge = 50;
  Position = Position;
  form: FormGroup;
  playerToUpdate$;
  constructor(private formBuilder: FormBuilder, private db: DataService) {
    this.update = false;
    let subscription = this.db.playerUpdate.subscribe(
      player => this.setForm(player)
  );
  }

  ngOnInit() {
    this.resetForm();
    };

  setForm(player){
      this.form = this.formBuilder.group({
        name: [player.name, Validators.required],
     age: [player.age,[ Validators.required, Validators.min(this.minAge), Validators.max(this.maxAge) ]],
     pos: [player.pos,Validators.required],
     team: [player.team,Validators.required],
     league: [player.league,Validators.required],
     numOfGoals: [player.numOfGoals,[Validators.required,Validators.min(0)]]
      });
      this.update = true;
      this.key = player.id;
      console.log(player.id);
  }

  resetForm(){
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
   age: [null,[ Validators.required, Validators.min(this.minAge), Validators.max(this.maxAge) ]],
   pos: [null,Validators.required],
   team: [null,Validators.required],
   league: [null,Validators.required],
   numOfGoals: [null,[Validators.required,Validators.min(0)]]
    });
    this.update = false;
    this.key = null;
  }

  addItem(){
    let values = this.form.value;
    let player = new Player("",values.name,values.age,values.pos,values.team,values.league,values.numOfGoals);
    this.db.addPlayer(player);
    this.resetForm();
  }

  updateItem(){
    let values = this.form.value;
    let player = new Player(this.key,values.name,values.age,values.pos,values.team,values.league,values.numOfGoals);
    this.db.updatePlayer(player);
    this.resetForm()
  }

// #region form fields
  get name(){
    return this.form.get('name');
  }

  get age(){
    return this.form.get('age');
  }

  get pos(){
    return this.form.get('pos');
  }

  get team(){
    return this.form.get('team');
  }

  get league(){
    return this.form.get('league');
  }

  get numOfGoals(){
    return this.form.get('numOfGoals');
  }

  get requiredValidation(){
    return "This field is required.";
  }

  get numOfGoalsValidation(){
    return "This field must be non-negative number.";
  }

  get ageValidation(){
    return "This field must be between " +  this.minAge + " and " + this.maxAge + ".";
  }
 // #endregion
}
