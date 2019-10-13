import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form.component';
import { ListComponent } from './components/list.component';


const ROUTES: Routes = [
  { path: 'list', component: ListComponent},
  { path: 'add', component: FormComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64]})], // [x, y]
  exports: [RouterModule]
})
export class AppRoutingModule { }
