import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  public nota1;
  public nota2;
  public nota3;
  public porce1;
  public porce2;
  public porce3;
  public porcentaje;
  public porcen;

  constructor() { }


calcular() {
    let res;
    let por;
    let fin;

    // tslint:disable-next-line: max-line-length
    res = ((JSON.parse(this.nota1) * (this.porce1))) + ((JSON.parse(this.nota2) * (this.porce2))) + ((JSON.parse(this.nota3) * (this.porce3)));
    por = ((JSON.parse(this.porce1)) + (JSON.parse(this.porce2))+ (JSON.parse(this.porce3)) - 100);


    fin = ((JSON.parse(res) / (por)));

    this.porcentaje = fin * -1;
    this.porcen = por * -1;


}
  ngOnInit() {
  }




}
