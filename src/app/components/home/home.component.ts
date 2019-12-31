import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fecha: Date;
  es: any;
  horas: number;
  
  tipoHoras: any[];
  selectedHora: any;
  
  lugares: any[];
  selectedLugar: any;
  datosEnviados = {}
  
  constructor() { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.tipoHoras = [
      { name: 'Normal', precio: 15 },
      { name: 'Nocturna', precio: 30 },
  ];

    this.lugares = [
      { name: 'Buxtintxury', code: 'BUX' },
      { name: 'San Martín', code: 'SMT' },
      { name: 'Coordinación', code: 'SUE' },
  ];

  
  }

  onSubmit(form: NgForm){
    this.datosEnviados = {
      fecha: form.value.fecha.toLocaleDateString(),
      horas: form.value.horas,
      precio: form.value.precio,
      lugar: form.value.lugar
    }
    console.log(this.datosEnviados);
    this.cancelarForm(form)
    // console.log(form.value.fecha.toLocaleDateString())
    // console.log(this.fecha.toLocaleDateString());
    // console.log(this.horas * this.selectedHora.precio,'euros');
  }

  cancelarForm(form: NgForm) {
    form.resetForm();
  }
  

}
