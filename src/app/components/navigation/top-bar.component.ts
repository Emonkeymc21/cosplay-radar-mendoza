import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-100 px-4 pt-[env(safe-area-inset-top)]">
      <div class="max-w-7xl mx-auto flex items-center justify-between py-3 gap-3">
        <!-- Logo -->
        <a routerLink="/inicio" class="flex items-center gap-2 min-w-fit">
          <div class="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
            CR
          </div>
          <div class="hidden sm:block">
            <h1 class="font-display font-bold text-lg text-gray-800 leading-tight">Cosplay Radar</h1>
            <p class="text-xs text-gray-500 -mt-0.5">Mendoza</p>
          </div>
        </a>
        
        <!-- Buscador -->
        <div class="flex-1 max-w-2xl relative">
          <input 
            type="search" 
            [(ngModel)]="terminoBusqueda"
            placeholder="Buscar cosplayers, productos, eventos..."
            class="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-primary-300 outline-none transition-all placeholder:text-gray-500"
          >
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        
        <!-- Notificaciones -->
        <button 
          class="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
          (click)="toggleNotificaciones()">
          <span class="text-xl">🔔</span>
          @if (notificacionesNoLeidas() > 0) {
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {{ notificacionesNoLeidas() }}
            </span>
          }
        </button>
      </div>
      
      <!-- Panel de notificaciones -->
      @if (mostrarNotificaciones()) {
        <div class="absolute right-4 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 fade-in">
          <div class="p-4 border-b border-gray-100">
            <h3 class="font-bold text-gray-800">Notificaciones</h3>
          </div>
          <div class="max-h-80 overflow-y-auto">
            @for (notif of notificaciones(); track notif.id) {
              <div class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50" (click)="marcarLeida(notif.id)">
                <div class="flex items-start gap-3">
                  <span class="text-xl mt-0.5">{{ notif.icono }}</span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">{{ notif.titulo }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ notif.mensaje }}</p>
                    <p class="text-[10px] text-gray-400 mt-1">{{ notif.tiempo }}</p>
                  </div>
                  @if (!notif.leida) {
                    <span class="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    header {
      position: relative;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.98);
    }
  `]
})
export class TopBarComponent {
  terminoBusqueda = '';
  mostrarNotificaciones = signal(false);
  
  notificaciones = signal([
    { id: '1', titulo: 'Nuevo mensaje', mensaje: 'Cosmaker Mendoza te envió un avance', icono: '💬', tiempo: 'hace 5 min', leida: false },
    { id: '2', titulo: 'Pedido actualizado', mensaje: 'Tu pedido está en producción', icono: '📦', tiempo: 'hace 1 hora', leida: false },
    { id: '3', titulo: 'Mendotaku 2025', mensaje: 'El evento comienza en 2 días', icono: '📅', tiempo: 'hace 3 horas', leida: true },
  ]);
  
  notificacionesNoLeidas() {
    return this.notificaciones().filter(n => !n.leida).length;
  }
  
  toggleNotificaciones() {
    this.mostrarNotificaciones.update(v => !v);
  }
  
  marcarLeida(id: string) {
    this.notificaciones.update(notifs => 
      notifs.map(n => n.id === id ? { ...n, leida: true } : n)
    );
  }
}
