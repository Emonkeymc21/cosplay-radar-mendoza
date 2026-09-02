import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-4">
      <h1 class="text-3xl font-display font-bold text-gray-800 mb-6">Eventos</h1>
      
      <div class="grid md:grid-cols-2 gap-4">
        @for (evento of eventos(); track evento.id) {
          <div 
            class="card cursor-pointer hover:shadow-xl transition-all group"
            (click)="verEvento(evento.id)">
            <div class="relative">
              <img [src]="evento.banner" [alt]="evento.nombre" class="w-full h-48 object-cover group-hover:scale-105 transition-transform">
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="badge badge-primary">{{ evento.zona }}</span>
                @if (evento.precioEntrada) {
                  <span class="badge badge-warning">${{ evento.precioEntrada.toLocaleString() }}</span>
                }
              </div>
              @if (evento.rsvpAbierto) {
                <span class="absolute top-3 right-3 badge badge-success">RSVP Abierto</span>
              }
            </div>
            <div class="p-4">
              <h2 class="font-bold text-lg text-gray-800 group-hover:text-primary-600 transition-colors">{{ evento.nombre }}</h2>
              <p class="text-sm text-gray-500 mt-1">{{ evento.descripcion }}</p>
              <div class="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <span>📅 {{ evento.fecha | date:'dd/MM/yyyy HH:mm' }}</span>
                <span>·</span>
                <span>📍 {{ evento.ubicacion }}</span>
              </div>
              <div class="flex items-center justify-between mt-3">
                <span class="text-xs text-gray-400">{{ evento.asistentes.length }} asistentes</span>
                <span class="text-primary-600 font-semibold text-sm">Ver detalles →</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class EventosComponent implements OnInit {
  eventos = this.eventosService.eventosDisponibles;
  
  constructor(
    private eventosService: EventosService,
    private router: Router
  ) {}
  
  ngOnInit() {}
  
  verEvento(id: string) {
    this.router.navigate(['/eventos', id]);
  }
}
