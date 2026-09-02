import { Component, OnInit, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Conversacion } from '../../models/models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 p-4 flex items-center gap-3 sticky top-0 z-10">
        <button (click)="volver()" class="text-gray-600 hover:text-primary-600 transition-colors">
          ←
        </button>
        <div class="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-lg">
          👤
        </div>
        <div>
          <h2 class="font-bold text-gray-800">Cosmaker Mendoza</h2>
          <p class="text-xs text-emerald-500">● En línea</p>
        </div>
      </div>
      
      <!-- Mensajes -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3" #scrollContainer>
        @for (msg of conversacion()?.mensajes; track msg.id) {
          <div class="flex" [class.justify-end]="msg.remitenteId === 'usr_1'">
            <div class="max-w-[75%]">
              @if (msg.tipo === 'texto') {
                <div 
                  class="p-3 rounded-2xl"
                  [class.bg-primary-500]="msg.remitenteId === 'usr_1'"
                  [class.text-white]="msg.remitenteId === 'usr_1'"
                  [class.bg-gray-100]="msg.remitenteId !== 'usr_1'"
                  [class.text-gray-800]="msg.remitenteId !== 'usr_1'">
                  {{ msg.contenido }}
                </div>
              } @else if (msg.tipo === 'avance') {
                <div class="card overflow-hidden">
                  <img [src]="msg.adjuntoUrl" alt="Avance" class="w-full h-48 object-cover">
                  <div class="p-3">
                    <p class="text-sm font-medium text-gray-800">📸 Avance del trabajo</p>
                    <p class="text-xs text-gray-500 mt-1">{{ msg.contenido }}</p>
                  </div>
                </div>
              } @else if (msg.tipo === 'ubicacion') {
                <div class="card p-3">
                  <p class="text-sm font-medium">📍 Plaza Independencia</p>
                  <p class="text-xs text-gray-500">Ciudad de Mendoza</p>
                </div>
              }
              <p class="text-[10px] text-gray-400 mt-1" 
                [class.text-right]="msg.remitenteId === 'usr_1'">
                {{ msg.fecha | date:'HH:mm' }}
              </p>
            </div>
          </div>
        }
      </div>
      
      <!-- Input -->
      <div class="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div class="flex gap-2">
          <button class="btn-secondary px-3 py-3">📎</button>
          <button class="btn-secondary px-3 py-3" (click)="enviarUbicacion()">📍</button>
          <input 
            type="text" 
            [(ngModel)]="nuevoMensaje"
            (keyup.enter)="enviarMensaje()"
            placeholder="Escribe un mensaje..."
            class="input-field flex-1">
          <button class="btn-primary px-4" (click)="enviarMensaje()">Enviar</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  conversacion = signal<Conversacion | undefined>(undefined);
  nuevoMensaje = '';
  
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const conv = this.chatService.conversacionesActivas().find(c => c.id === id);
      this.conversacion.set(conv);
    });
  }
  
  ngAfterViewChecked() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
  
  volver() {
    this.router.navigate(['/mensajes']);
  }
  
  enviarMensaje() {
    if (this.nuevoMensaje.trim() && this.conversacion()) {
      this.chatService.enviarMensaje(this.conversacion()!.id, this.nuevoMensaje);
      this.nuevoMensaje = '';
    }
  }
  
  enviarUbicacion() {
    if (this.conversacion()) {
      this.chatService.enviarMensaje(
        this.conversacion()!.id, 
        'Plaza Independencia', 
        'ubicacion'
      );
    }
  }
}
