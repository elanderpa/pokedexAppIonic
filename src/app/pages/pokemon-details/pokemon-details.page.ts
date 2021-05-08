import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {

  public pokeDetails: PokemonDetail;

  public segmentSelected: string;

  public pokemonHeight: number;
  public pokemonWeightInPounds: number;
  public pokemonWeightInKilograms: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router) {

    this.segmentSelected = 'abouts';


    if (this.router.getCurrentNavigation().extras?.state) {
      this.pokeDetails = this.router.getCurrentNavigation().extras.state.pokeDetails;
      this.getPokemonHeightAndWeight();
    }
    console.log('constructor');
  }

  ngOnInit() {
    this.activatedroute.data.subscribe(data => {
      console.log('data', data);
    });
  }

  public segmentChanged(event: CustomEvent) {
    console.log('segmentChanged', event);

    this.segmentSelected = event.detail.value;
  }

  public getPokemonHeightAndWeight() {
    const hectogramToPoundEquivalent = 0.2205;
    const poundsToKilogramsEquivalent = 0.4536;
    const decimetresToCentimetresEquivalent = 10;

    this.pokemonWeightInPounds = this.pokeDetails.weight * hectogramToPoundEquivalent;
    this.pokemonWeightInKilograms = this.pokemonWeightInPounds * poundsToKilogramsEquivalent;
    this.pokemonHeight = this.pokeDetails.height * decimetresToCentimetresEquivalent;
  }

  get pokeDescription() {
    return this.pokeDetails.species.specie_details.flavor_text_entries
    .find(flavorText => flavorText.language.name === 'es').flavor_text || '';
  }

}
