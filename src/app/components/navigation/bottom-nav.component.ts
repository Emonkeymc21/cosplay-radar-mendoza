import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface NavItem {
  ruta: string;
  icono: string;
  label: string;
  activo: boolean;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white border-t border-gray-200 shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div class="grid grid-cols-5 h-16">
        @for (item of items; track item.ruta) {
          <a [routerLink]="item.ruta" 
             class="flex flex-col items-center justify-center gap-1 transition-all duration-200"
             [class.text-primary-600]="item.activo"
             [class.text-gray-400]="!item.activo"
             (click)="navegar(item)">
            <span class="text-xl" [class.scale-125]="item.activo">{{ item.icono }}</span>
            <span class="text-xs font-medium">{{ item.label }}</span>
            @if (item.activo) {
              <span class="absolute top-0 w-8 h-0.5 bg-primary-500 rounded-full"></span>
            }
          </a>
        }
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
    nav {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
    }
    a {
      position: relative;
      cursor: pointer;
    }
  `]
})
export class BottomNavComponent {
  items: NavItem[] = [
    { ruta: '/inicio', icono: '🏠', label: 'Inicio', activo: true },
    { ruta: '/mercado', icono: '🛍️', label: 'Mercado', activo: false },
    { ruta: '/eventos', icono: '📅', label: 'Eventos', activo: false },
    { ruta: '/mensajes', icono: '💬', label: 'Mensajes', activo: false },
    { ruta: '/perfil', icono: '👤', label: 'Perfil', activo: false },
  ];
  
  constructor(private router: Router) {}
  
  navegar(item: NavItem) {
    this.items = this.items.map(i => ({ ...i, activo: i.ruta === item.ruta }));
  }
}
