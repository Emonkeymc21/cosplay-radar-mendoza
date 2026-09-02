import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ZonaMendoza } from '../../models/models';

@Component({
  selector: 'app-zone-select',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-lg">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-display font-bold text-gray-800">¿Dónde estás?</h1>
          <p class="text-gray-500 mt-2">Selecciona las zonas de Mendoza donde te mueves</p>
        </div>
        
        <div class="card p-6">
          <div class="grid grid-cols-2 gap-3">
            @for (zona of zonas; track zona) {
              <button 
                (click)="toggleZona(zona)"
                class="p-4 rounded-xl border-2 transition-all text-left cursor-pointer"
                [class.border-primary-500]="seleccionadas().includes(zona)"
                [class.bg-primary-50]="seleccionadas().includes(zona)"
                [class.border-gray-200]="!seleccionadas().includes(zona)"
                [class.hover:border-primary-300]="!seleccionadas().includes(zona)">
                <div class="flex items-center gap-2">
                  <span class="text-xl">{{ iconos[zona] }}</span>
                  <span class="font-medium text-gray-800">{{ zona }}</span>
                </div>
                @if (seleccionadas().includes(zona)) {
                  <span class="text-xs text-primary-600 font-semibold mt-1 block">✓ Seleccionada</span>
                }
              </button>
            }
          </div>
          
          <button 
            (click)="continuar()"
            class="btn-primary w-full mt-6"
            [disabled]="seleccionadas().length === 0">
            Continuar
          </button>
          
          <button 
            (click)="saltar()"
            class="btn-secondary w-full mt-3">
            Omitir por ahora
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ZoneSelectComponent {
  zonas: ZonaMendoza[] = ['Capital', 'Guaymallén', 'Godoy Cruz', 'Maipú', 'Las Heras', 'San Martín'];
  seleccionadas = signal<ZonaMendoza[]>([]);
  
  iconos: Record<ZonaMendoza, string> = {
    'Capital': '🏛️',
    'Guaymallén': '🏢',
    'Godoy Cruz': '🏘️',
    'Maipú': '🍇',
    'Las Heras': '⛰️',
    'San Martín': '🌳'
  };
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  toggleZona(zona: ZonaMendoza) {
    this.seleccionadas.update(current => {
      if (current.includes(zona)) {
        return current.filter(z => z !== zona);
      }
      return [...current, zona];
    });
  }
  
  continuar() {
    this.authService.seleccionarZonas(this.seleccionadas());
    this.router.navigate(['/inicio']);
  }
  
  saltar() {
    this.authService.seleccionarZonas(['Capital']);
    this.router.navigate(['/inicio']);
  }
}
