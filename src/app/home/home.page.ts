import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public categoryButtons = [
    {
      name: 'Pokedex',
      colorButton: 'pokedex-color'
    },
    {
      name: 'Moves',
      colorButton: 'moves-color'
    },
    {
      name: 'Abilities',
      colorButton: 'abilities-color'
    },
    {
      name: 'Items',
      colorButton: 'items-color'
    },
    {
      name: 'Locations',
      colorButton: 'locations-color'
    },
    {
      name: 'Types Chart',
      colorButton: 'typeschart-color'
    }
  ];

  constructor() {}

}
