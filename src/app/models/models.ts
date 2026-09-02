// ===== MODELOS DE DATOS =====

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  avatar?: string;
  rol: 'cosplayer' | 'cosmaker' | 'ambos';
  zonas: ZonaMendoza[];
  bio?: string;
  redesSociales?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  calificacionPromedio?: number;
  resenasRecibidas?: number;
  verificado?: boolean;
}

export type ZonaMendoza = 'Capital' | 'Guaymallén' | 'Godoy Cruz' | 'Maipú' | 'Las Heras' | 'San Martín';

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  color: string;
}

export interface Producto {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  categoriaId: string;
  imagenes: string[];
  vendedor: Usuario;
  disponible: boolean;
  esPersonalizado: boolean;
  tiempoProduccion?: string;
  stock: number;
  permitirSena: boolean;
  porcentajeSena: number;
  envio: {
    disponible: boolean;
    costo?: number;
    puntoEncuentro?: string[];
  };
  resenas: Resena[];
  createdAt: Date;
}

export interface Resena {
  id: string;
  autor: Usuario;
  calificacion: number; // 1-5
  comentario: string;
  fecha: Date;
  productoId?: string;
  imagenes?: string[];
}

export interface Evento {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: Date;
  fechaFin?: Date;
  ubicacion: string;
  zona: ZonaMendoza;
  banner: string;
  organizador: string;
  precioEntrada?: number;
  asistentes: Usuario[];
  lineup: Cosplayer[];
  galeria: string[];
  rsvpAbierto: boolean;
  capacidad?: number;
}

export interface Cosplayer {
  id: string;
  usuario: Usuario;
  personaje: string;
  serie: string;
  descripcion: string;
  fotos: string[];
}

export interface Mensaje {
  id: string;
  remitenteId: string;
  destinatarioId: string;
  contenido: string;
  tipo: 'texto' | 'imagen' | 'ubicacion' | 'avance';
  adjuntoUrl?: string;
  ubicacion?: {
    nombre: string;
    coordenadas: [number, number];
  };
  fecha: Date;
  leido: boolean;
}

export interface Conversacion {
  id: string;
  participantes: string[];
  mensajes: Mensaje[];
  ultimoMensaje: Mensaje;
  productoId?: string;
  pedidoId?: string;
}

export interface Pedido {
  id: string;
  compradorId: string;
  vendedorId: string;
  productoId: string;
  tipoPago: 'completo' | 'sena_50';
  montoTotal: number;
  montoPagado: number;
  montoRestante: number;
  estado: 'pendiente' | 'sena_pagada' | 'en_produccion' | 'listo_entrega' | 'completado' | 'cancelado';
  milestones: Milestone[];
  fechaCreacion: Date;
  fechaEntregaEstimada?: Date;
}

export interface Milestone {
  id: string;
  titulo: string;
  descripcion: string;
  completado: boolean;
  fecha?: Date;
  evidencia?: string[];
}

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'pedido' | 'mensaje' | 'evento' | 'sistema';
  fecha: Date;
  leida: boolean;
  enlace?: string;
}
