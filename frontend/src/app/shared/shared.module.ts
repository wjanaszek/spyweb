import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    ClickStopPropagation
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    ClickStopPropagation,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule {
}
