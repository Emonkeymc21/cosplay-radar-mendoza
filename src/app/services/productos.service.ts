import { Injectable, signal } from '@angular/core';
import { Producto, Categoria } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos = signal<Producto[]>([]);
  private categorias = signal<Categoria[]>([]);
  
  productosDisponibles = this.productos.asReadonly();
  categoriasDisponibles = this.categorias.asReadonly();
  
  constructor() {
    this.cargarDatosDemo();
  }
  
  private cargarDatosDemo() {
    const cats: Categoria[] = [
      { id: 'armaduras', nombre: 'Armaduras', icono: '🛡️', descripcion: 'Armaduras de cosplay', color: '#4B5563' },
      { id: 'pelucas', nombre: 'Pelucas', icono: '💇', descripcion: 'Pelucas estilizadas', color: '#EC4899' },
      { id: 'props', nombre: 'Props', icono: '⚔️', descripcion: 'Accesorios y armas', color: '#F59E0B' },
      { id: 'trajes', nombre: 'Trajes', icono: '👘', descripcion: 'Trajes completos', color: '#8B5CF6' },
      { id: 'maquillaje', nombre: 'Maquillaje FX', icono: '🎨', descripcion: 'Maquillaje especial', color: '#10B981' },
      { id: 'impresion3d', nombre: 'Impresión 3D', icono: '🖨️', descripcion: 'Piezas impresas en 3D', color: '#3B82F6' },
    ];
    
    const prods: Producto[] = [
      {
        id: 'prod_001',
        titulo: 'Armadura de Mandalorian completa',
        descripcion: 'Armadura completa de Mandalorian con casco incluido. Fabricada en PLA y resina, pintada a mano con detalles weathering. Incluye sistema de sujeción interno.',
        precio: 185000,
        precioOriginal: 220000,
        categoriaId: 'armaduras',
        imagenes: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
        vendedor: {
          id: 'usr_vend_1',
          nombre: 'Cosmaker Mendoza',
          email: 'cosmaker@mendoza.com',
          rol: 'cosmaker',
          zonas: ['Capital', 'Guaymallén'],
          calificacionPromedio: 4.8,
          resenasRecibidas: 25,
          verificado: true
        },
        disponible: true,
        esPersonalizado: true,
        tiempoProduccion: '3-4 semanas',
        stock: 2,
        permitirSena: true,
        porcentajeSena: 50,
        envio: {
          disponible: true,
          costo: 5000,
          puntoEncuentro: ['Plaza Independencia', 'Arístides']
        },
        resenas: [],
        createdAt: new Date('2024-01-15')
      },
      {
        id: 'prod_002',
        titulo: 'Peluca de Sailor Moon',
        descripcion: 'Peluca sintética de alta calidad, lista para estilizar. Color rubio con coletas largas. Incluye redecilla de regalo.',
        precio: 45000,
        categoriaId: 'pelucas',
        imagenes: ['https://picsum.photos/400/300?random=3'],
        vendedor: {
          id: 'usr_vend_2',
          nombre: 'PelucasMdz',
          email: 'pelucas@mendoza.com',
          rol: 'cosmaker',
          zonas: ['Godoy Cruz'],
          calificacionPromedio: 4.5,
          resenasRecibidas: 18,
          verificado: true
        },
        disponible: true,
        esPersonalizado: false,
        stock: 5,
        permitirSena: true,
        porcentajeSena: 50,
        envio: {
          disponible: true,
          costo: 2500
        },
        resenas: [],
        createdAt: new Date('2024-02-20')
      },
      {
        id: 'prod_003',
        titulo: 'Espada de Cloud Strife - Buster Sword',
        descripcion: 'Réplica de la Buster Sword de Final Fantasy VII. Fabricada en foam y PVC, ligera para cosplay. Perfecta para convenciones.',
        precio: 68000,
        categoriaId: 'props',
        imagenes: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5'],
        vendedor: {
          id: 'usr_vend_3',
          nombre: 'PropsMaker',
          email: 'props@mendoza.com',
          rol: 'cosmaker',
          zonas: ['Las Heras'],
          calificacionPromedio: 4.9,
          resenasRecibidas: 32,
          verificado: true
        },
        disponible: true,
        esPersonalizado: false,
        stock: 3,
        permitirSena: true,
        porcentajeSena: 50,
        envio: {
          disponible: false,
          puntoEncuentro: ['Plaza Independencia']
        },
        resenas: [],
        createdAt: new Date('2024-03-10')
      },
    ];
    
    this.categorias.set(cats);
    this.productos.set(prods);
  }
  
  getProductoById(id: string): Producto | undefined {
    return this.productos().find(p => p.id === id);
  }
  
  buscarProductos(termino: string): Producto[] {
    if (!termino) return this.productos();
    const term = termino.toLowerCase();
    return this.productos().filter(p => 
      p.titulo.toLowerCase().includes(term) || 
      p.descripcion.toLowerCase().includes(term)
    );
  }
  
  filtrarPorCategoria(categoriaId: string): Producto[] {
    if (!categoriaId || categoriaId === 'todos') return this.productos();
    return this.productos().filter(p => p.categoriaId === categoriaId);
  }
}
