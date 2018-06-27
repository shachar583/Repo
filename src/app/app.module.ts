import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { AddPlayerFormComponent } from './addplayer-form/addplayer-form.component';
import { PlayerComponent } from './items/players.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { FilterDataPipe } from './filter-data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AddPlayerFormComponent,
    FilterDataPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers:    [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
