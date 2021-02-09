import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public categoryButtons = [
    {
      name: 'Pokedex',
      colorButton: 'pokedex-color',
      navigateTo: 'pokedex'
    },
    {
      name: 'Moves',
      colorButton: 'moves-color',
      navigateTo: ''
    },
    {
      name: 'Abilities',
      colorButton: 'abilities-color',
      navigateTo: ''
    },
    {
      name: 'Items',
      colorButton: 'items-color'
    },
    {
      name: 'Locations',
      colorButton: 'locations-color',
      navigateTo: ''
    },
    {
      name: 'Types Chart',
      colorButton: 'typeschart-color',
      navigateTo: ''
    }
  ];

  constructor(private router: Router) {}

  public navigateTo(goTo: string = '') {

    if (!goTo.length) {
      return;
    }

    this.router.navigateByUrl(goTo);

  }

}
