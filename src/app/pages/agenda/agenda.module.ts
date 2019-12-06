import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

import { ModalAgendaPage } from './modal-agenda/modal-agenda.page';
import { ModalAgendaPageModule } from './modal-agenda/modal-agenda.module';
import { Agenda } from '../../interfaces/agenda';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    ModalAgendaPageModule
  ],
  declarations: [AgendaPage],
  entryComponents: [ModalAgendaPage]
})
export class AgendaPageModule {}
