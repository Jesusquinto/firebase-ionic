import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonItemSliding } from '@ionic/angular';
import { ModalAsignaturasPage } from './modal-asignaturas/modal-asignaturas.page';
import { Asignatura } from '../../interfaces/asignatura';
import { DataApiService } from 'src/app/services/data-api.service';

@Component ({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  public asignaturas: Array<Asignatura>; // Arreglo de asignaturas, conjunto de objetos
  public asignatura: Asignatura;        // Una sola asignatura, un solo objeto 
  @ViewChild('slide') slide: IonItemSliding;


  constructor(public modalController: ModalController, private servicio: DataApiService) { this.asignaturas = [] }


  async crearAsignatura(){
    this.slide.close();
    const modal = await this.modalController.create({
      component: ModalAsignaturasPage,
      componentProps: {
        estado: 'crear'
            }
    });
    modal.onDidDismiss().then();
    return await modal.present();

}

async editarAsignatura(asignatura: Asignatura){
  this.slide.close();
  const modal = await this.modalController.create({
    component: ModalAsignaturasPage,
    componentProps: {
      estado: 'editar',
      asignatura: asignatura
          }
  });
  return await modal.present();
}


eliminar(asignatura : Asignatura){
  console.log(asignatura.descripcion);
}

  ngOnInit() {
    this.servicio.getAllAsignaturas().subscribe(
      result => {console.log(result),this.asignaturas = result},
      error => {console.log(error)}
    )
  }

}
