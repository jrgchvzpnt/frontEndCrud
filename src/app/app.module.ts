import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//1.-Para trabajar con Reactive Forms
import {ReactiveFormsModule} from '@angular/forms'

//2.-Trabajar con la Peticiones Http
import { HttpClientModule } from '@angular/common/http';

//3.-Componentes para trabajar con las tablas
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

// 4.-Para Trabajar con controles de formularios de material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCommonModule} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

//5.- Para trabajar con mensajes de alertas
import {MatSnackBarModule} from '@angular/material/snack-bar'

//6.- Para trabajar con iconos de material
import {MatIconModule} from '@angular/material/icon'

//7.- Para Trabajar con modales de material
import {MatDialogModule} from '@angular/material/dialog'

// 8.- Para trabajar con grid
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component'


@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCommonModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
