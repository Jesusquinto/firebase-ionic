import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAgendaPage } from './modal-agenda/modal-agenda.page';
import { Agenda } from '../../interfaces/agenda';
import { DataApiService } from 'src/app/services/data-api.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  public agendas: Array<Agenda>; // Arreglo de asignaturas, conjunto de objetos
  public agenda: Agenda;        // Una sola asignatura, un solo objeto 

  constructor(public modalController: ModalController, private servicio: DataApiService) { this.agendas = [] }

  async crearAgenda(){
    const modal = await this.modalController.create({
      component: ModalAgendaPage,
      componentProps: {
        estado: 'crear'
            }
    });
    modal.onDidDismiss().then();
    return await modal.present();

}

async editarAgenda(agenda: Agenda){
  const modal = await this.modalController.create({
    component: ModalAgendaPage,
    componentProps: {
      estado: 'editar',
      agenda: agenda
          }
  });
  return await modal.present();
}





eliminar(tarea : Agenda){
  console.log(tarea.titulo);
}


  ngOnInit() {
    this.servicio.getAllAgendas().subscribe(
      result =>{this.agendas = result},
      error => {console.log(error)}
    )
    
  }

}
