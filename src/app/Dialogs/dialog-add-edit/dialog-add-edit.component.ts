import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import {MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MAT_DATE_FORMATS} from '@angular/material/core'

import * as moment from 'moment'

import { TipoProducto } from 'src/app/Interfaces/tipo-producto';
import { Producto } from 'src/app/Interfaces/producto';
import { TipoProductoService } from 'src/app/Services/tipo-producto.service';
import { ProductoService } from 'src/app/Services/producto.service';


export const MY_DATE_FORMATS = {
  parse:{
    dateinput: 'DD/MM/YYYY'
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLable: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}


@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS,useValue: MY_DATE_FORMATS}
  ]
})

export class DialogAddEditComponent implements OnInit {
  formProducto: FormGroup;
  titulo:string = "Nuevo";
  botonaccion:string = "Guardar";
  ListaTiposProducto:TipoProducto[] = []
  
  
  
  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _TipoproductoService: TipoProductoService,
    private _productoService: ProductoService,
    //Recibir datos del fomulario donde se muestran los datos
    @Inject(MAT_DIALOG_DATA) public dataProducto:Producto



  ){
    this.formProducto = this.fb.group({
      nombreProducto:['',Validators.required],
      descripcionProducto:['',Validators.required],
      tipoProductoId:['', Validators.required],
      precio:['',Validators.required],
      existencia:['',Validators.required],
      fechaRegistro:['',Validators.required]

    })

    this._TipoproductoService.getList().subscribe({

      next:(data) => {
        this.ListaTiposProducto = data;
      },
      error:(e)=>{}
    });

  }

  
 
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000

    });
  }

  addEditProducto(){
    console.log(this.formProducto.value);

    const modelo : Producto = {
      id: 0,
      NombreProducto: this.formProducto.value.nombreProducto,
      DescripcionProducto: this.formProducto.value.descripcionProducto,
      Precio: this.formProducto.value.precio,
      Existencia: this.formProducto.value.existencia,
      TipoProductoId: this.formProducto.value.tipoProductoId,
      NombreTipoProducto: this.formProducto.value.NombreTipoProducto,
      FechaRegistro: moment(this.formProducto.value.fechaRegistro).format("DD/MM/YYYY")
    }

    if (this.dataProducto == null)
    {
      this._productoService.add(modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Producto fue creado","Listo");
          this.dialogoReferencia.close("creado");
        }
        ,
        error:(e) =>{
          this.mostrarAlerta("No se pudo crear","Error");
        }
        
      })
    }else{
      this._productoService.update(this.dataProducto.id,modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Producto fue editado","Listo");
          this.dialogoReferencia.close("editado");
        }
        ,
        error:(e) =>{
          this.mostrarAlerta("No se pudo editar","Error");
        }
        
      })
    }

   
      

  }

  ngOnInit(): void {
    if (this.dataProducto)
    {
      this.formProducto.patchValue({
        nombreProducto: this.dataProducto.NombreProducto,
        descripcionProducto: this.dataProducto.DescripcionProducto,
        precio: this.dataProducto.Precio,
        existencia: this.dataProducto.Existencia,
        tipoProductoId: this.dataProducto.TipoProductoId,
        NombreTipoProducto: this.dataProducto.NombreProducto,
        fechaRegistro: moment(this.dataProducto.FechaRegistro,"DD/MM/YYYY")



      })
      {
      this.titulo = "Editar";
      this.botonaccion = "Actualizar";
      }
    }
  }







}
