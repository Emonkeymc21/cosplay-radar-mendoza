import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/models';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-4">
      @if (producto(); as prod) {
        <!-- Botón volver -->
        <button (click)="volver()" class="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
          ← Volver al mercado
        </button>
        
        <!-- Galería de imágenes -->
        <div class="grid sm:grid-cols-2 gap-2 mb-6">
          @for (img of prod.imagenes; track img; let i = $index) {
            <img [src]="img" [alt]="prod.titulo" class="rounded-2xl object-cover w-full h-64 cursor-pointer hover:opacity-90 transition-opacity">
          }
        </div>
        
        <!-- Info principal -->
        <div class="card p-6 mb-4">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h1 class="text-3xl font-display font-bold text-gray-800 mb-2">{{ prod.titulo }}</h1>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <span class="text-yellow-500">★ {{ prod.vendedor.calificacionPromedio }}</span>
                <span>({{ prod.vendedor.resenasRecibidas }} reseñas)</span>
                <span>·</span>
                <span>{{ prod.vendedor.zonas.join(' · ') }}</span>
              </div>
            </div>
            @if (prod.vendedor.verificado) {
              <span class="badge badge-success">✓ Verificado</span>
            }
          </div>
          
          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-4xl font-bold text-primary-600">${{ prod.precio.toLocaleString() }}</span>
            @if (prod.precioOriginal) {
              <span class="text-xl text-gray-400 line-through">${{ prod.precioOriginal.toLocaleString() }}</span>
              <span class="badge badge-warning">
                Ahorra ${{ (prod.precioOriginal - prod.precio).toLocaleString() }}
              </span>
            }
          </div>
          
          <p class="text-gray-600 mb-4">{{ prod.descripcion }}</p>
          
          <div class="grid grid-cols-2 gap-3 text-sm mb-6">
            <div class="bg-gray-50 p-3 rounded-xl">
              <span class="text-gray-500">Categoría:</span>
              <span class="font-medium text-gray-800 block">{{ prod.categoriaId }}</span>
            </div>
            <div class="bg-gray-50 p-3 rounded-xl">
              <span class="text-gray-500">Stock:</span>
              <span class="font-medium text-gray-800 block">{{ prod.stock }} unidades</span>
            </div>
            @if (prod.esPersonalizado) {
              <div class="bg-gray-50 p-3 rounded-xl">
                <span class="text-gray-500">Tiempo de producción:</span>
                <span class="font-medium text-gray-800 block">{{ prod.tiempoProduccion }}</span>
              </div>
            }
          </div>
          
          <!-- Botones de pago -->
          <div class="grid gap-3">
            <button 
              (click)="comprarAhora(prod)"
              class="btn-primary w-full text-lg">
              💳 Comprar Ahora - ${{ prod.precio.toLocaleString() }}
            </button>
            
            @if (prod.permitirSena) {
              <button 
                (click)="encargarConSena(prod)"
                class="btn-secondary w-full text-lg border-primary-300 text-primary-600">
                🔒 Encargar con Seña - ${{ (prod.precio * prod.porcentajeSena / 100).toLocaleString() }}
              </button>
            }
          </div>
        </div>
        
        <!-- Vendedor -->
        <div class="card p-6 mb-4">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Vendedor</h2>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ prod.vendedor.nombre }}</h3>
              <p class="text-sm text-gray-500">Se une en {{ prod.createdAt | date:'MMMM yyyy' }}</p>
            </div>
            <button class="btn-outline ml-auto">Contactar</button>
          </div>
        </div>
        
        <!-- Envío -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Entrega</h2>
          @if (prod.envio.disponible) {
            <div class="text-gray-600">
              <p>🚚 Envío disponible - ${{ prod.envio.costo?.toLocaleString() }}</p>
            </div>
          }
          @if (prod.envio.puntoEncuentro) {
            <div class="mt-3">
              <p class="text-sm font-medium text-gray-700 mb-2">Puntos de encuentro:</p>
              <div class="flex gap-2 flex-wrap">
                @for (punto of prod.envio.puntoEncuentro; track punto) {
                  <span class="badge badge-primary">📍 {{ punto }}</span>
                }
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="text-center py-12">
          <p class="text-gray-500">Producto no encontrado</p>
          <button class="btn-primary mt-4" (click)="volver()">Volver al mercado</button>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ProductoDetalleComponent implements OnInit {
  producto = signal<Producto | undefined>(undefined);
  
  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.producto.set(this.productosService.getProductoById(id));
    });
  }
  
  volver() {
    this.router.navigate(['/mercado']);
  }
  
  comprarAhora(producto: Producto) {
    this.router.navigate(['/mercado/checkout', producto.id], { 
      queryParams: { tipo: 'completo' } 
    });
  }
  
  encargarConSena(producto: Producto) {
    this.router.navigate(['/mercado/checkout', producto.id], { 
      queryParams: { tipo: 'sena_50' } 
    });
  }
}
