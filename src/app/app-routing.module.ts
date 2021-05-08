import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./pages/pokedex/pokedex.module').then(m => m.PokedexPageModule)
  },
  {
    path: 'pokemon-details',
    loadChildren: () => import('./pages/pokemon-details/pokemon-details.module').then( m => m.PokemonDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
