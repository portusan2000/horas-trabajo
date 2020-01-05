import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ITrabajo } from '../../models/trabajo.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.css']
})
export class TrabajoComponent implements OnInit {

   // Variables de la Entrada de Datos
   es: any;
   trabajomodel: ITrabajo;
 
   //Variables enlazadas al dropdown
   tipoHoras: any[];
   lugares: any[];
 
 
   datosEnviados: ITrabajo;
 
   minDate: Date;
   maxDate: Date;
   year: Date;
   // Variables de la Tabla de Datos PrimeNG
 
   trabajos: ITrabajo[] = [];
   selectedTrabajos: ITrabajo[];
   cols: any[];
   columns: any[];
   filterCentro: any[];
   filterTipoHora: any[];
   sumaHoras: string;
 

  constructor(
    private _Api: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.minDate = new Date("01/01/2020");
    this.maxDate = new Date("01/01/2021");
    this.year = new Date;
    this.trabajomodel = {
      _id: '',
      fecha: '',
      horas: '',
      tipoHora: '',
      lugarTrabajo: ''
    }
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
      { nombre: 'Normal', codigo: 'NORM' },
      { nombre: 'Nocturna', codigo: 'NOCT' },
      { nombre: 'Festividad', codigo: 'FEST' },
      { nombre: 'Asuntos Propios', codigo: 'ASPR' },
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
      { field: '', header: '', width: '10%' },
      { field: '', header: '', width: '10%' },
    ];

    this.filterTipoHora = [
      { label: 'Todas las horas', value: null },
      { label: 'Normal', value: 'Normal' },
      { label: 'Nocturna', value: 'Nocturna' },
      { label: 'Festividad', value: 'Festividad' },
      { label: 'Asuntos Propios', value: 'Asuntos Propios' },
    ];

    // Si quiero filtrar por centros en el futuro
    // this.filterCentro = [
    //   { label: 'Todos los Centros', value: null },
    //   { label: 'Buxtintxuri', value: 'Buxtintxuri' },
    //   { label: 'San Martín', value: 'San Martín' },
    //   { label: 'Coordinación', value: 'Coordinación' },
    // ];

    // Código de configaración para el botón PDF
    this.columns = this.cols.map(col => {
      console.log('Las cols son:', { title: col.header, dataKey: col.field });
      return { title: col.header, dataKey: col.field };
    })
  }

  // Cuando se da guardar al formulario de entrada de Datos
  onSubmit(form: NgForm) {
    console.log(!form.value._id);
    if (!form.value._id) {
      // Crear Registro
      this.trabajomodel = {
        fecha: form.value.fecha.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }),
        horas: form.value.horas.toLocaleTimeString([], { timeStyle: 'short' }),
        tipoHora: form.value.tipoHora.nombre,
        lugarTrabajo: form.value.lugarTrabajo.nombre
      };
      this._Api.postApi(this.trabajomodel).subscribe(
        res => {
          console.log('Datos recibidos:', res);
          this.messageService.add({ key: 'guardado', severity: 'success', summary: 'Confirmación', detail: res['message'] });
        },
        err => console.error('Error', err),
        () => {
          this.getAllWorks()
        }
      )
      console.log(this.datosEnviados);
      this.cancelarForm(form)
      // console.log(form.value.fecha.toLocaleDateString())
      // console.log(this.fecha.toLocaleDateString());
      // console.log(this.horas * this.selectedHora.precio,'euros');


    } else {
      // Actualizo el registro
      console.log(this.trabajomodel.fecha);
      console.log('longitud de la fecha:', this.trabajomodel.fecha.length);
      var fechaCambiada = this.trabajomodel.fecha;
      this.trabajomodel = {
        _id: this.trabajomodel._id,
        fecha: this.cambiaFecha(this.trabajomodel.fecha),
        horas: form.value.horas.toLocaleTimeString([], { timeStyle: 'short' }),
        tipoHora: form.value.tipoHora.nombre,
        lugarTrabajo: form.value.lugarTrabajo.nombre
      };
      console.log('Importante:', this.trabajomodel)
      this._Api.putApi(this.trabajomodel).subscribe(
        res => {
          console.log('La respuesta del servidor es:', res);
          this.getAllWorks();
        }
      )

    }


  }

  cancelarForm(form: NgForm) {
    form.resetForm();
  }

  getAllWorks() {
    this._Api.getApi().subscribe(
      data => {
        this.trabajos = data['works'];
        console.log('Los datos son:', this.trabajos);
        console.log('Las horas son:', this.trabajos[3].horas);
        this.sumaHoras = this.trabajos[3].horas
      },
      err => console.error('Ha ocurrido un error', err),
      () => console.log('Datos del servidor Recibidos OK!')
    )
  }

  
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.columns, this.trabajos);
        doc.save('primengTable.pdf');
      })
    })
  }


  borrarTrabajo(id: string) {
    this.confirmationService.confirm({
      message: 'Estas seguro de borrar el registro',
      header: 'Advertencia',
      icon: 'pi pi-triangle',
      acceptLabel: 'Sí',

      accept: () => {
        // Lógica de Programación si es 'SI' en la confirmación
        this._Api.deleteApi(id).subscribe(
          data => {
            console.log(data);
            this.messageService.add({ key: 'borrado', severity: 'success', summary: 'Confirmación', detail: 'Registro borrado correctamente' });
          },
          err => console.log('Ha ocurrido un error'),
          () => this.getAllWorks()
        );
      },

      reject: () => {
        this.messageService.add({ key: 'borrado', severity: 'warn', summary: 'Información', detail: 'Operación cancelada' });
      }
    })
  }

  editar(datos: ITrabajo) {
    // this.trabajomodel = datos;
    this.trabajomodel = {
      _id: datos._id,
      fecha: datos.fecha,
      horas: datos.horas,
      tipoHora: datos.tipoHora,
      lugarTrabajo: datos.lugarTrabajo
    }
  }

  cambiaFecha(fechaCambiada) {
    if (fechaCambiada.length !== 10) {
      return fechaCambiada
    } else {
      return fechaCambiada.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
  }


}
