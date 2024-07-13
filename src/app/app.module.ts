// app.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // No más AppComponent aquí
  ],
  imports: [
    HttpClientModule,
    FormsModule
  ],
  providers: [],
})
export class AppModule { }
