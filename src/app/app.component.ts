import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Producto } from './Interfaces/producto';
import { ProductoService } from './Services/producto.service';

import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';


import {MatSnackBar} from '@angular/material/snack-bar'

import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['NombreProducto', 'DescripcionProducto', 'Precio', 'Existencia','NombreTipoProducto','FechaRegistro','Acciones'];
  dataSource = new MatTableDataSource<Producto>();

  constructor (
    private _productoServicio:ProductoService,public dialog: MatDialog, private _snackBar:MatSnackBar
    ){

  }

  ngOnInit(): void {
    this.mostrarProductos();
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarProductos(){
    this._productoServicio.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },error:(e) =>{}

    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000

    });
  }

  dialogoEliminarProducto(dataProducto:Producto){
    this.dialog.open(DialogoDeleteComponent,{
      disableClose:true,
      data:dataProducto
    }).afterClosed().subscribe(resultado => {
      if (resultado === 'eliminar')
      {
        this._productoServicio.delete(dataProducto.id).subscribe({
          next:(data)=>{
            this.mostrarAlerta("Producto fue eliminado","Listo");
            this.mostrarProductos();
          }
        })
      }
    })
  }

  dialogoNuevoProducto() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"400px"
    }).afterClosed().subscribe(resultado => {
      if (resultado === 'creado')
      {
        this.mostrarProductos();
      }
    })
  }

  dialogoEditarProducto(dataProducto:Producto) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data:dataProducto
    }).afterClosed().subscribe(resultado => {
      if (resultado === 'editado')
      {
        this.mostrarProductos();
      }
    })
  }
}

