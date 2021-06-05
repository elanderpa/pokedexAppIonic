import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PokemonDetail, ReqRes, SpecieDetail, EvolutionChain, Evolutions } from '../models/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlPokeApi = 'https://pokeapi.co/api/v2/';


  constructor(private http: HttpClient) { }

  public getPokemons(query: string = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0') {

    return this.http.get<ReqRes>(query).pipe(
      map(resp => {
        resp.results.map(pokemon => {
          this.getPokemonDetails(pokemon.url).subscribe(pokemonDetail => {
            pokemon.pokemon_detail = pokemonDetail;
            this.getPokemonSpecieDetails(pokemon.pokemon_detail.species.url).subscribe(speciesDetails => {
              pokemon.pokemon_detail.species.specie_details = speciesDetails;
              this.getEvolutionDetails(speciesDetails.evolution_chain.url).subscribe(evolutions => {
                pokemon.pokemon_detail.species.specie_details.evolution_chain.evolutions = evolutions;
              });
            });
          });

        });

        return resp;

      }),
    );
  }

  public searchPokemon(name: string) {
    return this.http.get<PokemonDetail>(`${this.urlPokeApi}pokemon/${name}`);
  }

  public getPokemonDetails(query) {
    return this.http.get<PokemonDetail>(query);
  }

  public getPokemonSpecieDetails(query) {
    return this.http.get<SpecieDetail>(query);

  }

  public getEvolutionDetails(query) {
    return this.http.get<Evolutions>(query);
  }
}


