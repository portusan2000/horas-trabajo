import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ITrabajo } from '../../models/trabajo.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  // Variables de la Entrada de Datos
  fecha: Date;
  es: any;
  horas: number;

  tipoHoras: any[];
  selectedHora: any;

  lugares: any[];
  selectedLugar: any;

  datosEnviados: ITrabajo;


  
  // Variables de la Tabla de Datos PrimeNG
  
  trabajos: ITrabajo[] = [];
  selectedTrabajos: ITrabajo[];
  cols: any[];
  columns: any[];
  filterCentro: any[];
  filterTipoHora: any[];

  constructor(private _Api: ApiService) { }

  ngOnInit() {
    // Definiciones del Formulario de Entrada
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
      { nombre: 'Normal', codigo:'NORM' },
      { nombre: 'Nocturna', codigo:'NOCT' },
      { nombre: 'Festividad', codigo:'FEST' },
      { nombre: 'Asuntos Propios', codigo:'ASPR' },
    ];

    this.lugares = [
      { nombre: 'Buxtintxuri', code: 'BUX' },
      { nombre: 'San Martín', code: 'SMT' },
      { nombre: 'Coordinación', code: 'SOS' },
    ];

    // Actualizacion de la Tabla PrimeNG
    this.getAllWorks();

    // Configuración de las columnas de la Tabla PrimeNG

    this.cols = [
      { field: 'fecha', header: 'Fecha', width: '25%' },
      { field: 'horas', header: 'Horas', width: '25%' },
      { field: 'tipoHora', header: 'Tipo de Horas', width: '25%' },
      { field: 'lugarTrabajo', header: 'Lugar', width: '25%' },
    ];

    this.filterTipoHora = [
      { label: 'Todas las horas', value: null },
      { label: 'Normal', value: 'Normal' },
      { label: 'Nocturna', value: 'Nocturna' },
      { label: 'Festividad', value: 'Festividad' },
      { label: 'Asuntos Propios', value: 'Asuntos Propios' },
    ];

    // this.filterCentro = [
    //   { label: 'Todos los Centros', value: null },
    //   { label: 'Buxtintxuri', value: 'Buxtintxuri' },
    //   { label: 'San Martín', value: 'San Martín' },
    //   { label: 'Coordinación', value: 'Coordinación' },
    // ];


    this.columns = this.cols.map(col => {
      console.log('Las cols son:', {title: col.header, dataKey: col.field});
      return {title: col.header, dataKey: col.field};
    }) 
  }

  onSubmit(form: NgForm) {
    this.datosEnviados = {
      fecha: form.value.fecha.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}),
      horas: form.value.horas.toLocaleTimeString([], {timeStyle: 'short'}),
      tipoHora: form.value.tipoHora.nombre,
      lugarTrabajo: form.value.lugarTrabajo.nombre
    }
    this._Api.postApi(this.datosEnviados).subscribe(
      res => {
        console.log('Datos recibidos:', res);
      },
      err => console.error('Error', err),
      () => this.getAllWorks() 
    )
    console.log(this.datosEnviados);
    this.cancelarForm(form)
    // console.log(form.value.fecha.toLocaleDateString())
    // console.log(this.fecha.toLocaleDateString());
    // console.log(this.horas * this.selectedHora.precio,'e, codigo:''uros');
  }

  cancelarForm(form: NgForm) {
    form.resetForm();
  }

  getAllWorks(){
    this._Api.getApi().subscribe(
      data => {
        this.trabajos = data['works'];
        console.log('Los datos son:', data['works'])
      },
      err => console.error('Ha ocurrido un error', err),
      () => console.log('Datos OK!')
    )
  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.columns, this.trabajos);
            doc.save('primengTable.pdf');
        })
    })
}


}
