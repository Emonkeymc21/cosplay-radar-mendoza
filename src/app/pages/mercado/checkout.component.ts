import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-4">
      <h1 class="text-3xl font-display font-bold text-gray-800 mb-6">Finalizar Compra</h1>
      
      @if (producto(); as prod) {
        <div class="card p-6 mb-4">
          <div class="flex items-center gap-4 mb-4">
            <img [src]="prod.imagenes[0]" [alt]="prod.titulo" class="w-20 h-20 rounded-xl object-cover">
            <div>
              <h3 class="font-bold text-gray-800">{{ prod.titulo }}</h3>
              <p class="text-sm text-gray-500">{{ prod.vendedor.nombre }}</p>
            </div>
          </div>
          
          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ prod.precio.toLocaleString() }}</span>
            </div>
            
            @if (tipoPago() === 'sena_50') {
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Seña (50%)</span>
                <span class="font-medium text-amber-600">${{ (prod.precio * 0.5).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Restante al recibir</span>
                <span class="font-medium">${{ (prod.precio * 0.5).toLocaleString() }}</span>
              </div>
            }
            
            @if (prod.envio.disponible && prod.envio.costo) {
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Envío</span>
                <span class="font-medium">${{ prod.envio.costo.toLocaleString() }}</span>
              </div>
            }
            
            <div class="border-t border-gray-100 pt-2 flex justify-between">
              <span class="font-bold text-gray-800">Total a pagar</span>
              <span class="text-2xl font-bold text-primary-600">
                ${{ total().toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Método de pago -->
        <div class="card p-6 mb-4">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Método de Pago</h2>
          <div class="space-y-3">
            <button 
              (click)="seleccionarMetodo('mercadopago')"
              class="w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer"
              [class.border-primary-500]="metodoPago() === 'mercadopago'"
              [class.bg-primary-50]="metodoPago() === 'mercadopago'"
              [class.border-gray-200]="metodoPago() !== 'mercadopago'">
              <div class="flex items-center gap-3">
                <span class="text-2xl">💳</span>
                <div>
                  <h3 class="font-bold text-gray-800">Mercado Pago</h3>
                  <p class="text-sm text-gray-500">Tarjeta, débito o efectivo</p>
                </div>
              </div>
            </button>
            
            <button 
              (click)="seleccionarMetodo('transferencia')"
              class="w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer"
              [class.border-primary-500]="metodoPago() === 'transferencia'"
              [class.bg-primary-50]="metodoPago() === 'transferencia'"
              [class.border-gray-200]="metodoPago() !== 'transferencia'">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🏦</span>
                <div>
                  <h3 class="font-bold text-gray-800">Transferencia Bancaria</h3>
                  <p class="text-sm text-gray-500">CBU o Alias</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Milestone Tracker -->
        @if (pedidoRealizado()) {
          <div class="card p-6 mb-4 fade-in">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Estado del Pedido</h2>
            <div class="space-y-3">
              @for (milestone of milestones(); track milestone.id) {
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center"
                    [class.bg-primary-500]="milestone.completado"
                    [class.text-white]="milestone.completado"
                    [class.bg-gray-200]="!milestone.completado"
                    [class.text-gray-400]="!milestone.completado">
                    @if (milestone.completado) { ✓ } @else { {{ $index + 1 }} }
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-800">{{ milestone.titulo }}</p>
                    <p class="text-xs text-gray-500">{{ milestone.descripcion }}</p>
                  </div>
                  @if (milestone.completado) {
                    <span class="badge badge-success">Completado</span>
                  }
                </div>
              }
            </div>
          </div>
        }
        
        <button 
          (click)="confirmarPedido()"
          class="btn-primary w-full text-lg"
          [disabled]="pedidoRealizado()">
          @if (pedidoRealizado()) {
            ✓ Pedido Confirmado
          } @else {
            Confirmar y Pagar
          }
        </button>
      }
    </div>
  `,
  styles: []
})
export class CheckoutComponent implements OnInit {
  producto = signal<Producto | undefined>(undefined);
  tipoPago = signal<'completo' | 'sena_50'>('completo');
  metodoPago = signal<'mercadopago' | 'transferencia'>('mercadopago');
  pedidoRealizado = signal(false);
  
  milestones = signal([
    { id: 'm1', titulo: 'Pago de seña', descripcion: 'Se ha pagado el 50% del producto', completado: false },
    { id: 'm2', titulo: 'Producción', descripcion: 'El cosmaker está creando tu producto', completado: false },
    { id: 'm3', titulo: 'Control de calidad', descripcion: 'Revisión final del producto', completado: false },
    { id: 'm4', titulo: 'Entrega', descripcion: 'Entrega o punto de encuentro', completado: false },
  ]);
  
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
    
    this.route.queryParams.subscribe(params => {
      if (params['tipo'] === 'sena_50') {
        this.tipoPago.set('sena_50');
      }
    });
  }
  
  total() {
    const prod = this.producto();
    if (!prod) return 0;
    let total = this.tipoPago() === 'sena_50' ? prod.precio * 0.5 : prod.precio;
    if (prod.envio.disponible && prod.envio.costo) {
      total += prod.envio.costo;
    }
    return total;
  }
  
  seleccionarMetodo(metodo: 'mercadopago' | 'transferencia') {
    this.metodoPago.set(metodo);
  }
  
  confirmarPedido() {
    this.pedidoRealizado.set(true);
    const mils = this.milestones();
    mils[0].completado = true;
    this.milestones.set([...mils]);
    
    setTimeout(() => {
      this.router.navigate(['/perfil']);
    }, 3000);
  }
}
