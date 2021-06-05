import { PokemonService } from './../../services/pokemon.service';
import { Chain } from './../../models/pokemon.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon.interface';

interface EvoChain {
  name:     string;
  urlImage: Promise<string>;
  evolTo:   EvolTo;
}

interface EvolTo {
  name:     string;
  urlImage: Promise<string>;
}

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

  public evolutionChain: Array<any> = [];

  public evoChain: EvoChain[] = [];

  public defaultPokeImg: string = '../../../assets/imgs/whos-that-pokemon.png';

  constructor(private router: Router, private pokemonService: PokemonService) {

    this.segmentSelected = 'abouts';


    if (this.router.getCurrentNavigation().extras?.state) {
      this.pokeDetails = this.router.getCurrentNavigation().extras.state.pokeDetails;
      this.getPokemonHeightAndWeight();
    }
    console.log('constructor', this.pokeDetails);

    this.geEvolutions();
  }

  ngOnInit() {

  }

  public segmentChanged(event: CustomEvent) {

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

  public getBaseStat(baseStat) {
    console.log('getBaseStat', baseStat);

    return baseStat / 100;
  }

  private geEvolutions() {

    if (this.pokeDetails.species.specie_details.evolution_chain.evolutions.chain.evolves_to.length) {

    }

    let evolvesTo: Chain[] = [...this.pokeDetails.species.specie_details.evolution_chain.evolutions.chain.evolves_to];

    let prevPokemon = this.pokeDetails.species.specie_details.evolution_chain.evolutions.chain.species.name;
    
    do {

      this.evoChain.push({
        name: prevPokemon,
        urlImage: this.buildPokeUrlImg(prevPokemon),
        evolTo: {
          name: evolvesTo[0]?.species.name || '',
          urlImage: this.buildPokeUrlImg(evolvesTo[0]?.species.name)
        }
      });

      prevPokemon = evolvesTo[0]?.species.name || '';
      evolvesTo = evolvesTo[0]?.evolves_to || [];
    } while (evolvesTo.length);
    console.log('evoChainseje', this.evoChain);
  }

  buildPokeUrlImg(name: string): Promise<string> {

    return new Promise<string>((resolve) => {

        if (!name || !name.length) {
          resolve(this.defaultPokeImg);
          return;
        }

        this.pokemonService.searchPokemon(name).subscribe(({ id }) => {
          
          const urlImg = `https://pokeres.bastionbot.org/images/pokemon/${id}.png?raw=true`;
          resolve(urlImg);
        });
    });

  }

}
