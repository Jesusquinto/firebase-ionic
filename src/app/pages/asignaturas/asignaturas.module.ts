import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasPageRoutingModule } from './asignaturas-routing.module';

import { AsignaturasPage } from './asignaturas.page';
import { ModalAsignaturasPage } from './modal-asignaturas/modal-asignaturas.page';
import { ModalAsignaturasPageModule } from './modal-asignaturas/modal-asignaturas.module';
import { Asignatura } from '../../interfaces/asignatura';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasPageRoutingModule,
    ModalAsignaturasPageModule
  ],
  declarations: [AsignaturasPage],
  entryComponents: [ModalAsignaturasPage]
})
export class AsignaturasPageModule {


}


