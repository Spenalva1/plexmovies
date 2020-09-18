import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  private movies = [
    {
      id: '1',
      title: 'Titanic',
      rating: '4',
      description: 'lorem asdlkjf asdlkf jlkdjfoii l lidj lk di j lkd i flkdjfli j',
      imageURL: "https://www.ecartelera.com/carteles/2400/2425/002_m.jpg";
    },
    {
      id: '2',
      title: 'jurasi',
      rating: '3',
      description: 'lorem asdlkjf asdlkf jlkdjfoii l lidj lk di j lkd i flkdjfli j',
      imageURL: "https://cdn.shopify.com/s/files/1/0037/8008/3782/products/jurassic_park_advance_JC11660_C2_framed_18f65a21-f414-4407-b7bc-930200c6cd94.jpg?v=1596119558",
    },
    {
      id: '3',
      title: 'Pres',
      rating: '5',
      description: 'lorem asdlkjf asdlkf jlkdjfoii l lidj lk di j lkd i flkdjfli j',
      imageURL: "https://lh3.googleusercontent.com/-neONkpwIRCOM70Z2yV3s8B2k3pRhOJjnHQv2fKenL8DPYwh0OgkY6v_QYjRhpdw1rM";
    },
    {
      id: '4',
      title: 'Padrino',
      rating: '1',
      description: 'lorem asdlkjf asdlkf jlkdjfoii l lidj lk di j lkd i flkdjfli j',
      imageURL: "https://i.pinimg.com/originals/43/07/38/430738c35b952652f3372dd6c1a9aa59.jpg";
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
