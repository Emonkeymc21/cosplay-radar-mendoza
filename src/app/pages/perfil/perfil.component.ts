import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-4">
      <!-- Header del perfil -->
      <div class="card p-6 mb-4">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center text-3xl text-white font-bold shadow-xl">
            {{ iniciales() }}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-display font-bold text-gray-800">{{ usuario()?.nombre }}</h1>
              @if (usuario()?.verificado) {
                <span class="text-primary-500">✓</span>
              }
            </div>
            <p class="text-sm text-gray-500">{{ usuario()?.email }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-yellow-500">★ {{ usuario()?.calificacionPromedio || 0 }}</span>
              <span class="text-xs text-gray-400">({{ usuario()?.resenasRecibidas || 0 }} reseñas)</span>
            </div>
          </div>
          <button 
            (click)="editarPerfil()"
            class="btn-outline px-4 py-2 text-sm">
            ✏️ Editar
          </button>
        </div>
        
        <div class="flex gap-2 mt-4">
          @for (zona of usuario()?.zonas || []; track zona) {
            <span class="badge badge-primary">📍 {{ zona }}</span>
          }
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-primary-600">12</p>
          <p class="text-xs text-gray-500">Publicaciones</p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-accent-600">8</p>
          <p class="text-xs text-gray-500">Servicios</p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-emerald-600">25</p>
          <p class="text-xs text-gray-500">Seguidores</p>
        </div>
      </div>
      
      <!-- Tabs -->
      <div class="flex gap-2 mb-4">
        <button 
          (click)="tabActivo.set('galeria')"
          class="flex-1 py-2 rounded-xl font-medium text-sm transition-all"
          [class.bg-primary-500]="tabActivo() === 'galeria'"
          [class.text-white]="tabActivo() === 'galeria'"
          [class.bg-white]="tabActivo() !== 'galeria'"
          [class.text-gray-600]="tabActivo() !== 'galeria'"
          [class.border]="tabActivo() !== 'galeria'"
          [class.border-gray-200]="tabActivo() !== 'galeria'">
          📸 Galería
        </button>
        <button 
          (click)="tabActivo.set('publicaciones')"
          class="flex-1 py-2 rounded-xl font-medium text-sm transition-all"
          [class.bg-primary-500]="tabActivo() === 'publicaciones'"
          [class.text-white]="tabActivo() === 'publicaciones'"
          [class.bg-white]="tabActivo() !== 'publicaciones'"
          [class.text-gray-600]="tabActivo() !== 'publicaciones'"
          [class.border]="tabActivo() !== 'publicaciones'"
          [class.border-gray-200]="tabActivo() !== 'publicaciones'">
          🛍️ Publicaciones
        </button>
        <button 
          (click)="tabActivo.set('resenas')"
          class="flex-1 py-2 rounded-xl font-medium text-sm transition-all"
          [class.bg-primary-500]="tabActivo() === 'resenas'"
          [class.text-white]="tabActivo() === 'resenas'"
          [class.bg-white]="tabActivo() !== 'resenas'"
          [class.text-gray-600]="tabActivo() !== 'resenas'"
          [class.border]="tabActivo() !== 'resenas'"
          [class.border-gray-200]="tabActivo() !== 'resenas'">
          ⭐ Reseñas
        </button>
      </div>
      
      <!-- Contenido del tab -->
      @if (tabActivo() === 'galeria') {
        <div class="grid grid-cols-3 gap-2">
          @for (i of [1,2,3,4,5,6]; track i) {
            <img [src]="'https://picsum.photos/200/200?random=' + (i + 50)" class="w-full h-32 object-cover rounded-xl hover:opacity-80 transition-opacity cursor-pointer">
          }
        </div>
      }
      
      @if (tabActivo() === 'publicaciones') {
        <div class="space-y-3">
          <div class="card p-4">
            <h3 class="font-bold text-gray-800 mb-2">Armadura de Mandalorian</h3>
            <p class="text-sm text-gray-500">Estado: En producción</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div class="bg-primary-500 h-2 rounded-full" style="width: 65%"></div>
            </div>
            <p class="text-xs text-gray-400 mt-1">65% completado</p>
          </div>
          <div class="card p-4">
            <h3 class="font-bold text-gray-800 mb-2">Peluca de Sailor Moon</h3>
            <p class="text-sm text-gray-500">Estado: Lista para entrega</p>
          </div>
        </div>
      }
      
      @if (tabActivo() === 'resenas') {
        <div class="space-y-3">
          @for (i of [1,2,3]; track i) {
            <div class="card p-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center text-sm">👤</div>
                <div>
                  <p class="font-medium text-gray-800 text-sm">Usuario {{ i }}</p>
                  <div class="text-yellow-500 text-xs">
                    @for (star of [1,2,3,4,5]; track star) {
                      <span>★</span>
                    }
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-600">Excelente trabajo, muy recomendable. El producto superó mis expectativas.</p>
            </div>
          }
        </div>
      }
      
      <button 
        (click)="cerrarSesion()"
        class="btn-secondary w-full mt-4 text-red-600 border-red-300 hover:border-red-500 hover:bg-red-50">
        Cerrar Sesión
      </button>
    </div>
  `,
  styles: []
})
export class PerfilComponent {
  tabActivo = signal<'galeria' | 'publicaciones' | 'resenas'>('galeria');
  usuario = this.authService.usuario;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  iniciales(): string {
    const nombre = this.usuario()?.nombre || 'CR';
    return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
  
  editarPerfil() {
    this.router.navigate(['/perfil/editar']);
  }
  
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
