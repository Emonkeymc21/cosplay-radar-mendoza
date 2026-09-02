import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-4">
      <h1 class="text-3xl font-display font-bold text-gray-800 mb-6">Mensajes</h1>
      
      <div class="space-y-3">
        @for (conv of conversaciones(); track conv.id) {
          <div 
            class="card p-4 flex items-center gap-4 cursor-pointer hover:shadow-xl transition-all"
            (click)="abrirChat(conv.id)">
            <div class="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-xl">
              👤
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-bold text-gray-800">Cosmaker Mendoza</h3>
                <span class="text-xs text-gray-400">{{ conv.ultimoMensaje.fecha | date:'HH:mm' }}</span>
              </div>
              <p class="text-sm text-gray-500 truncate">{{ conv.ultimoMensaje.contenido }}</p>
              @if (conv.productoId) {
                <span class="badge badge-primary mt-1 text-xs">Producto relacionado</span>
              }
            </div>
            @if (!conv.ultimoMensaje.leido) {
              <span class="w-3 h-3 bg-primary-500 rounded-full"></span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class MensajesComponent {
  conversaciones = this.chatService.conversacionesActivas;
  
  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}
  
  abrirChat(id: string) {
    this.router.navigate(['/mensajes/chat', id]);
  }
}
