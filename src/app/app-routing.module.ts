import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeResultsPage } from './pages/home-results/home-results.page';
import { AudiosPage } from './pages/audios/audios.page';



const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', component: HomeResultsPage },
  { path: 'clases', component: AudiosPage },
  { path: 'asignaturas', loadChildren: './pages/asignaturas/asignaturas.module#AsignaturasPageModule'},
  { path: 'agenda', loadChildren: './pages/agenda/agenda.module#AgendaPageModule' },
  { path: 'notas', loadChildren: './pages/notas/notas.module#NotasPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
