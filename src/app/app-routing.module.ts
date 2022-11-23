import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules} from '@angular/router';

import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {ArticuloComponent} from "./articulo/articulo.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'articulo', component: ArticuloComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
