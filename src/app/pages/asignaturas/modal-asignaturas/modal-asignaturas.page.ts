import { Component, OnInit, Input } from '@angular/core';
import { Asignatura } from '../../../interfaces/asignatura';
import { ModalController } from '@ionic/angular';
import { DataApiService } from 'src/app/services/data-api.service';


@Component({
  selector: 'app-modal-asignaturas',
  templateUrl: './modal-asignaturas.page.html',
  styleUrls: ['./modal-asignaturas.page.scss'],
})
export class ModalAsignaturasPage implements OnInit {
  @Input() public asignatura: Asignatura;        // Una sola asignatura, un solo objeto
  @Input() public estado: string;

  constructor(private modal: ModalController, private servicio: DataApiService) {}

  ngOnInit() {

    if (this.estado == 'crear') {
      this.asignatura = {
        nombre: '',
        profesor: '',
        salon: '',
        descripcion: ''
      };
    }

  }

  cerrar(){
    this.modal.dismiss();
  }

  crear(){
    this.servicio.addAsignatura(this.asignatura);
    this.modal.dismiss({
    })
  }

  editar(){
    this.servicio.updateAsignatura(this.asignatura);
    this.modal.dismiss();
  }






  onSubmitTemplate() {
    console.log('Form submit');
    //console.log(this.asignaturas);
    }


}
