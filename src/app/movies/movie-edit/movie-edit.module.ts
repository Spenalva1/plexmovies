import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieEditPageRoutingModule } from './movie-edit-routing.module';

import { MovieEditPage } from './movie-edit.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieEditPageRoutingModule,
    StarRatingModule,
  ],
  declarations: [MovieEditPage]
})
export class MovieEditPageModule { }
