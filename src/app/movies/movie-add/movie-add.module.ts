import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieAddPageRoutingModule } from './movie-add-routing.module';

import { MovieAddPage } from './movie-add.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieAddPageRoutingModule,
    StarRatingModule,
  ],
  declarations: [MovieAddPage]
})
export class MovieAddPageModule { }
