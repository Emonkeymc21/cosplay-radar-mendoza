import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../models/models';

@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-4">
      @if (evento(); as evt) {
        <button (click)="volver()" class="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
          ← Volver a eventos
        </button>
        
        <div class="relative rounded-3xl overflow-hidden mb-6 shadow-2xl">
          <img [src]="evt.banner" [alt]="evt.nombre" class="w-full h-72 object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6">
            <h1 class="text-4xl font-display font-bold text-white mb-2">{{ evt.nombre }}</h1>
            <div class="flex items-center gap-2 text-white/90 text-sm">
              <span>📅 {{ evt.fecha | date:'dd/MM/yyyy HH:mm' }}</span>
              <span>·</span>
              <span>📍 {{ evt.ubicacion }}</span>
            </div>
          </div>
        </div>
        
        <!-- RSVP -->
        <div class="card p-6 mb-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-800">Confirmar Asistencia</h2>
              <p class="text-gray-500 text-sm">¡No te pierdas este evento!</p>
            </div>
            <button 
              (click)="confirmarAsistencia()"
              class="btn-primary"
              [disabled]="confirmado()">
              @if (confirmado()) {
                ✓ Asistencia Confirmada
              } @else {
                Voy a Asistir
              }
            </button>
          </div>
        </div>
        
        <!-- Descripción -->
        <div class="card p-6 mb-4">
          <h2 class="text-xl font-bold text-gray-800 mb-3">Sobre el evento</h2>
          <p class="text-gray-600">{{ evt.descripcion }}</p>
          <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div class="bg-gray-50 p-3 rounded-xl">
              <span class="text-gray-500">Organizador:</span>
              <span class="font-medium block">{{ evt.organizador }}</span>
            </div>
            <div class="bg-gray-50 p-3 rounded-xl">
              <span class="text-gray-500">Zona:</span>
              <span class="font-medium block">{{ evt.zona }}</span>
            </div>
            @if (evt.capacidad) {
              <div class="bg-gray-50 p-3 rounded-xl">
                <span class="text-gray-500">Capacidad:</span>
                <span class="font-medium block">{{ evt.capacidad }} personas</span>
              </div>
            }
            @if (evt.precioEntrada) {
              <div class="bg-gray-50 p-3 rounded-xl">
                <span class="text-gray-500">Entrada:</span>
                <span class="font-medium block">${{ evt.precioEntrada.toLocaleString() }}</span>
              </div>
            }
          </div>
        </div>
        
        <!-- Asistentes -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            Asistentes ({{ evt.asistentes.length }})
          </h2>
          @if (evt.asistentes.length > 0) {
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
              @for (asistente of evt.asistentes; track asistente.id) {
                <div class="text-center">
                  <div class="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2">
                    👤
                  </div>
                  <p class="text-xs font-medium text-gray-700">{{ asistente.nombre }}</p>
                </div>
              }
            </div>
          } @else {
            <p class="text-gray-500 text-center py-4">Sé el primero en confirmar asistencia</p>
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class EventoDetalleComponent implements OnInit {
  evento = signal<Evento | undefined>(undefined);
  confirmado = signal(false);
  
  constructor(
    private eventosService: EventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.evento.set(this.eventosService.getEventoById(id));
    });
  }
  
  volver() {
    this.router.navigate(['/eventos']);
  }
  
  confirmarAsistencia() {
    this.confirmado.set(true);
    const evt = this.evento();
    if (evt) {
      this.eventosService.confirmarAsistencia(evt.id, 'usr_1');
    }
  }
}
