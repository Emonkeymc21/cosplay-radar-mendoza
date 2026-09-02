import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/models';

@Component({
  selector: 'app-mercado',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-display font-bold text-gray-800">Mercado</h1>
        <span class="badge badge-primary">{{ productosFiltrados().length }} productos</span>
      </div>
      
      <!-- Filtros -->
      <div class="mb-6 space-y-3">
        <div class="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <button 
            (click)="filtrar('todos')"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
            [class.bg-primary-500]="filtroCategoria() === 'todos'"
            [class.text-white]="filtroCategoria() === 'todos'"
            [class.bg-white]="filtroCategoria() !== 'todos'"
            [class.text-gray-600]="filtroCategoria() !== 'todos'"
            [class.border]="filtroCategoria() !== 'todos'"
            [class.border-gray-200]="filtroCategoria() !== 'todos'">
            Todos
          </button>
          @for (cat of categorias(); track cat.id) {
            <button 
              (click)="filtrar(cat.id)"
              class="px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2"
              [class.bg-primary-500]="filtroCategoria() === cat.id"
              [class.text-white]="filtroCategoria() === cat.id"
              [class.bg-white]="filtroCategoria() !== cat.id"
              [class.text-gray-600]="filtroCategoria() !== cat.id"
              [class.border]="filtroCategoria() !== cat.id"
              [class.border-gray-200]="filtroCategoria() !== cat.id">
              <span>{{ cat.icono }}</span>
              {{ cat.nombre }}
            </button>
          }
        </div>
        
        <div class="relative">
          <input 
            type="search" 
            [(ngModel)]="terminoBusqueda"
            (ngModelChange)="buscar()"
            placeholder="Buscar productos..."
            class="input-field pl-10">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>
      
      <!-- Grid de productos -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @for (producto of productosFiltrados(); track producto.id) {
          <div 
            class="card cursor-pointer hover:shadow-xl transition-all group"
            (click)="verProducto(producto.id)">
            <div class="relative">
              <img [src]="producto.imagenes[0]" [alt]="producto.titulo" class="w-full h-52 object-cover group-hover:scale-105 transition-transform">
              <div class="absolute top-3 left-3 flex flex-col gap-1">
                @if (producto.esPersonalizado) {
                  <span class="badge badge-primary">Personalizado</span>
                }
                @if (producto.permitirSena) {
                  <span class="badge badge-warning">Seña {{ producto.porcentajeSena }}%</span>
                }
              </div>
              @if (!producto.disponible) {
                <div class="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                  <span class="text-white font-bold text-lg">No disponible</span>
                </div>
              }
            </div>
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-bold text-gray-800 group-hover:text-primary-600 transition-colors flex-1 mr-2">{{ producto.titulo }}</h3>
                <span class="text-yellow-500">★ {{ producto.vendedor.calificacionPromedio }}</span>
              </div>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ producto.descripcion }}</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-primary-600">${{ producto.precio.toLocaleString() }}</span>
                  @if (producto.precioOriginal) {
                    <span class="text-sm text-gray-400 line-through ml-2">${{ producto.precioOriginal.toLocaleString() }}</span>
                  }
                </div>
                <span class="text-xs text-gray-400">{{ producto.stock }} disponibles</span>
              </div>
              <div class="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <span>📍</span>
                <span>{{ producto.vendedor.zonas.join(' · ') }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class MercadoComponent implements OnInit {
  categorias = this.productosService.categoriasDisponibles;
  terminoBusqueda = '';
  filtroCategoria = signal('todos');
  
  productosFiltrados = signal<Producto[]>([]);
  
  constructor(
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.aplicarFiltros();
    
    this.route.queryParams.subscribe(params => {
      if (params['categoria']) {
        this.filtrar(params['categoria']);
      }
    });
  }
  
  buscar() {
    this.aplicarFiltros();
  }
  
  filtrar(categoriaId: string) {
    this.filtroCategoria.set(categoriaId);
    this.aplicarFiltros();
  }
  
  aplicarFiltros() {
    let productos = this.productosService.filtrarPorCategoria(this.filtroCategoria());
    if (this.terminoBusqueda) {
      productos = productos.filter(p => 
        p.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
    this.productosFiltrados.set(productos);
  }
  
  verProducto(id: string) {
    this.router.navigate(['/mercado/producto', id]);
  }
}
