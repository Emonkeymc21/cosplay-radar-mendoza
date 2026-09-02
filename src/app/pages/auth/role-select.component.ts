import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-lg">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-display font-bold text-gray-800">¿Cuál es tu rol?</h1>
          <p class="text-gray-500 mt-2">Selecciona cómo quieres participar en la comunidad</p>
        </div>
        
        <div class="grid gap-4">
          <button 
            (click)="seleccionarRol('cosplayer')"
            class="card p-6 text-left hover:border-primary-300 hover:shadow-xl transition-all cursor-pointer group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎭
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-800">Cosplayer</h3>
                <p class="text-sm text-gray-600 mt-1">
                  Creo y muestro mis cosplays, participo en eventos y compro productos.
                </p>
                <span class="badge badge-primary mt-2">Busco productos</span>
              </div>
            </div>
          </button>
          
          <button 
            (click)="seleccionarRol('cosmaker')"
            class="card p-6 text-left hover:border-accent-300 hover:shadow-xl transition-all cursor-pointer group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-accent-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🛠️
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-800">Cosmaker / Tienda</h3>
                <p class="text-sm text-gray-600 mt-1">
                  Vendo mis creaciones, ofrezco servicios de comisión y construyo mi reputación.
                </p>
                <span class="badge badge-warning mt-2">Vendo productos</span>
              </div>
            </div>
          </button>
          
          <button 
            (click)="seleccionarRol('ambos')"
            class="card p-6 text-left hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer group">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🌟
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-800">Ambos</h3>
                <p class="text-sm text-gray-600 mt-1">
                  Hago cosplay y también vendo mis creaciones o servicios.
                </p>
                <span class="badge badge-success mt-2">Perfil completo</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RoleSelectComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  seleccionarRol(rol: 'cosplayer' | 'cosmaker' | 'ambos') {
    this.authService.seleccionarRol(rol);
    this.router.navigate(['/auth/zone-select']);
  }
}
