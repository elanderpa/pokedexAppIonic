import { Component, OnInit } from '@angular/core';
import { PokemonDetail, ReqRes } from 'src/app/models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  public pokemons: Pokemon[] = [];
  private nexPage = '';

  constructor(
    public pokemonService: PokemonService,
    public router: Router
    ) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((res: ReqRes) => {
      this.pokemons = res.results;
      this.nexPage = res.next;
    });
  }

  public loadData(event) {
    if (this.nexPage) {
      this.pokemonService.getPokemons(this.nexPage).subscribe((res: any) => {
        this.nexPage = res.next;
        this.pokemons.push(...res.results);
        event.target.complete();
      });
    } else {
      event.target.complete();
      event.target.disabled = true;
    }
  }

  public goToPokemonDetails(pokeDetails: PokemonDetail) {
    console.log('goToPokemonDetails', pokeDetails);

    this.router.navigateByUrl('/pokemon-details', {
      state: {
        pokeDetails
      }
    });
  }

}
