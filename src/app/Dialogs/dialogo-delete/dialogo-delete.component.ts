import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Producto } from 'src/app/Interfaces/producto';


@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit {
  constructor(private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    //Recibir datos del fomulario donde se muestran los datos
    @Inject(MAT_DIALOG_DATA) public dataProducto:Producto){


    
  }
  ngOnInit(): void {
    
  }
  confirmar_Eliminar(){
    if (this.dataProducto)
    {
      this.dialogoReferencia.close("eliminar");
    }
  }
   

}
