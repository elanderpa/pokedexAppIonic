import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { PokemonDetail, ReqRes, SpecieDetail } from '../models/pokemon.interface';


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
            console.log('resp', pokemon);
            this.getPokemonDetails(pokemon.url).subscribe(pokemonDetail => {
              pokemon.pokemon_detail = pokemonDetail;
              this.getPokemonSpecieDetails(pokemon.pokemon_detail.species.url).subscribe(speciesDetails => {
                pokemon.pokemon_detail.species.specie_details = speciesDetails;
              });
            });

          });

          return resp;

      }),
    );
  }

  public getPokemonDetails(query) {
    return this.http.get<PokemonDetail>(query);
  }

  public getPokemonSpecieDetails(query) {
    return this.http.get<SpecieDetail>(query);

  }
}


