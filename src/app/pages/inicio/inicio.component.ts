import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { EventosService } from '../../services/eventos.service';
import { Producto, Evento } from '../../models/models';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-4">
      <!-- Hero Carousel -->
      <div class="relative h-64 sm:h-80 rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600">
          <img src="https://picsum.photos/1200/400?random=30" alt="Mendotaku" class="w-full h-full object-cover opacity-30">
        </div>
        <div class="absolute inset-0 flex flex-col justify-center px-8">
          <span class="badge badge-warning mb-3 w-fit">🔥 Evento Destacado</span>
          <h1 class="text-3xl sm:text-5xl font-display font-bold text-white mb-2">Mendotaku 2025</h1>
          <p class="text-white/90 mb-4">El evento más grande de cultura pop en Mendoza</p>
          <button class="btn-primary bg-white text-primary-600 hover:bg-gray-100 w-fit" (click)="verEvento()">
            Ver Detalles
          </button>
        </div>
      </div>
      
      <!-- Categorías -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-display font-bold text-gray-800">Categorías</h2>
          <a routerLink="/mercado" class="text-primary-600 font-semibold hover:underline text-sm">Ver todo →</a>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
          @for (cat of categorias(); track cat.id) {
            <button 
              (click)="irCategoria(cat.id)"
              class="card p-4 text-center hover:shadow-xl transition-all cursor-pointer hover:scale-105">
              <span class="text-3xl block mb-2">{{ cat.icono }}</span>
              <span class="text-xs font-medium text-gray-700">{{ cat.nombre }}</span>
            </button>
          }
        </div>
      </section>
      
      <!-- Productos Destacados -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-display font-bold text-gray-800">Productos Destacados</h2>
          <a routerLink="/mercado" class="text-primary-600 font-semibold hover:underline text-sm">Ver mercado →</a>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (producto of productosDestacados(); track producto.id) {
            <div 
              class="card cursor-pointer hover:shadow-xl transition-all group"
              (click)="verProducto(producto.id)">
              <div class="relative">
                <img [src]="producto.imagenes[0]" [alt]="producto.titulo" class="w-full h-48 object-cover group-hover:scale-105 transition-transform">
                @if (producto.permitirSena) {
                  <span class="absolute top-3 left-3 badge badge-warning">Seña 50%</span>
                }
              </div>
              <div class="p-4">
                <h3 class="font-bold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">{{ producto.titulo }}</h3>
                <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ producto.descripcion }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-primary-600">${{ producto.precio.toLocaleString() }}</span>
                  <span class="text-xs text-gray-400">{{ producto.vendedor.nombre }}</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      
      <!-- Próximos Eventos -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-display font-bold text-gray-800">Próximos Eventos</h2>
          <a routerLink="/eventos" class="text-primary-600 font-semibold hover:underline text-sm">Ver agenda →</a>
        </div>
        <div class="space-y-3">
          @for (evento of eventos(); track evento.id) {
            <div 
              class="card p-4 flex items-center gap-4 cursor-pointer hover:shadow-xl transition-all"
              (click)="verEventoDetalle(evento.id)">
              <img [src]="evento.banner" [alt]="evento.nombre" class="w-24 h-24 rounded-xl object-cover">
              <div class="flex-1">
                <h3 class="font-bold text-gray-800">{{ evento.nombre }}</h3>
                <p class="text-sm text-gray-500">{{ evento.fecha | date:'dd/MM/yyyy' }}</p>
                <p class="text-xs text-gray-400">{{ evento.ubicacion }} · {{ evento.zona }}</p>
              </div>
              <span class="text-gray-400">→</span>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class InicioComponent implements OnInit {
  categorias = this.productosService.categoriasDisponibles;
  eventos = this.eventosService.eventosDisponibles;
  
  productosDestacados = signal<Producto[]>([]);
  
  constructor(
    private productosService: ProductosService,
    private eventosService: EventosService,
    private router: Router
  ) {}
  
  ngOnInit() {
    const todos = this.productosService.buscarProductos('');
    this.productosDestacados.set(todos.slice(0, 3));
  }
  
  verProducto(id: string) {
    this.router.navigate(['/mercado/producto', id]);
  }
  
  verEvento() {
    this.router.navigate(['/eventos/evt_001']);
  }
  
  verEventoDetalle(id: string) {
    this.router.navigate(['/eventos', id]);
  }
  
  irCategoria(categoriaId: string) {
    this.router.navigate(['/mercado'], { queryParams: { categoria: categoriaId } });
  }
}
