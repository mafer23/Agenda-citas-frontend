import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from "../../src/app/services/app.service";
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';

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
  userState: any ;
  errorMessage: string | null = null;
  isModalOpen = false;
  selectedState!: string;
  states = ['Contactado', 'Esperando respuesta', 'Llamada', 'Win', 'Lose'];
  changeLog: string[] = [];

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
        this.userState = response.state;
        this.errorMessage = null;

         // Guardar el estado del usuario en localStorage
         if (this.userState) {
          this.callService.setUserStateLocalStorage(this.userState);
        }
      },
      (error: any) => {
        this.userState = "";
        this.errorMessage = error.error;
      }
    );
  }

  // Método para obtener el estado del usuario desde localStorage
  getUserStateFromLocalStorage(): void {
    this.userState = this.callService.getUserStateLocalStorage();
  }
  openStateModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

 

  saveState() {
    if (this.selectedState) {
      this.userState = this.selectedState;
      this.logChange(`Estado guardado: ${this.selectedState}`);
      this.closeModal();
    }
  }
  
  logChange(message: string) {
    const timestamp = new Date();
    this.changeLog.push(`${timestamp.toLocaleString()}: ${message}`);
  }


  actualizarEstado() {

    
    this.callService.updateState(this.email, this.selectedState)
      .subscribe(
        (response) => {
          console.log('Estado actualizado correctamente', response);
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
}
