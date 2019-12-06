import { Component, OnInit, Input } from '@angular/core';
import { Agenda } from '../../../interfaces/agenda';
import { ModalController } from '@ionic/angular';
import { Asignatura } from '../../../interfaces/asignatura'
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.page.html',
  styleUrls: ['./modal-agenda.page.scss'],
})
export class ModalAgendaPage implements OnInit {

  @Input() public agenda: Agenda;        // Una sola asignatura, un solo objeto
  @Input() public estado: string;
  public asignaturas: Array<Asignatura>;



  constructor(private modal: ModalController, private servicio: DataApiService) {}

  ngOnInit() {
    this.servicio.getAllAsignaturas().subscribe(
      result => {this.asignaturas = result;
        if(this.estado == 'editar'){
          this.asignaturas.forEach(a =>{
            if(a.id == this.agenda.asignatura.id){
              this.agenda.asignatura =a;
            }
          })
        }
        
      },
      error => {console.log(error)}
    )


    if (this.estado == 'crear') {
      this.agenda = {
        asignatura: null,
        titulo: '',
        fecha: null,
        descripcion: ''
      };
    }

  }

  cerrar(){
    this.modal.dismiss();
  }

  editar(){
    this.servicio.updateAgenda(this.agenda);
    this.modal.dismiss();
  }

  crear(){
    this.servicio.addAgenda(this.agenda);
    this.modal.dismiss()



  }






  onSubmitTemplate() {
 
    console.log('Form submit');
    //console.log(this.agenda);
    }


}