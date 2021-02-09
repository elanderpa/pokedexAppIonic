import { Component, OnInit } from '@angular/core';
import { ReqRes } from 'src/app/models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.interface';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  public pokemons: Pokemon[] = [];
  private nexPage = '';

  constructor(public pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((res: ReqRes) => {
      console.log('pokemons', res);
      this.pokemons = res.results;
      this.nexPage = res.next;
    });
  }

  public loadData(event) {
    console.log('this.nexPage', this.nexPage);
    if (this.nexPage) {
      this.pokemonService.getPokemons(this.nexPage).subscribe((res: any) => {
        console.log('nextPage', res);
        this.nexPage = res.next;
        this.pokemons.push(...res.results);
        event.target.complete();
      });
    } else {
      event.target.complete();
      event.target.disabled = true;
    }
  }

}
