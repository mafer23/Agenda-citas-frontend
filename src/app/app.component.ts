import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from "../../src/app/services/app.service";
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { createSignal } from '@angular/core/primitives/signals';

interface LeadData {
  campo1:string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
  campo6: string;
  campo7: string;
  campo8: string;
  campo9: string;
  
 
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService]
})
export class AppComponent {
  title = 'Change of status register';

  email: string = '';
  cerrar: boolean = false;
  userState: BehaviorSubject<string> = new BehaviorSubject<string>('');

 
  //userState1: any;
  errorMessage: string | null = null;
  isModalOpen = false;
  selectedState!: string;
  states = ['Contactado', 'Esperando respuesta', 'Llamada', 'Win', 'Lose'];
  changeLog: string[] = [];
  
  leadData: LeadData = {} as LeadData; // Inicializa como un objeto vacío tipado


  constructor(private callService:AppService){

  }

  menuOpen = false;
  nestedMenuOpen = false;

  registroMenu = false;
  nestregistroMenu = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleNestedMenu() {
    this.nestedMenuOpen = !this.nestedMenuOpen;
  }

  searchCallState() {
    this.callService.getUserState(this.email).subscribe(
      (response: any) => {
        console.log('1')
        this.userState.next(response.state); // Actualiza el estado del usuario
        localStorage.setItem('userState', response.state); //
        this.errorMessage = null;
 console.log('Primer dato:', this.userState)
         // Guardar el estado del usuario en localStorage
       
      },
      (error: any) => {
        console.log('2')
        this.userState.error(error);
        this.errorMessage = error.error;
      }
    );
    this.getAllDate() 
  }


  openStateModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

 


  
  logChange(message: string) {
    const timestamp = new Date();
    this.changeLog.push(`${timestamp.toLocaleString()}: ${message}`);
  }


  actualizarEstado() {

    
    this.callService.updateState(this.email, this.selectedState)
      .subscribe(
        (response) => {
          console.log('3')
          console.log('Estado actualizado exitosamente');
          console.log('Nuevo estado:', this.selectedState);
          this.userState.next(this.selectedState);
          this.registroMenu = !this.registroMenu
 
        
        
        },
        (error) => {
          console.error('Error al actualizar estado:', error);
        }
      );
 

  }

  toggleNestedRegistro() {
    this.registroMenu = !this.registroMenu
  }
  
  getAllDate() {
    
    this.callService.getAllDate(this.email).subscribe(
      (data) => {
        this.leadData = data.leadData;// Convertir los valores de leadData en un array
        this.errorMessage = null;
        console.log('Datos del lead:', this.leadData);
      },
      (error) => {
        this.errorMessage = 'Error al obtener datos del lead';
        console.error('Error:', error);
      }
    );
     
   
  }


}
