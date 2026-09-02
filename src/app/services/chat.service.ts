import { Injectable, signal } from '@angular/core';
import { Conversacion, Mensaje } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private conversaciones = signal<Conversacion[]>([]);
  conversacionesActivas = this.conversaciones.asReadonly();
  
  constructor() {
    this.cargarDemo();
  }
  
  private cargarDemo() {
    const convs: Conversacion[] = [
      {
        id: 'conv_001',
        participantes: ['usr_1', 'usr_vend_1'],
        mensajes: [
          {
            id: 'msg_001',
            remitenteId: 'usr_1',
            destinatarioId: 'usr_vend_1',
            contenido: '¡Hola! Me interesa la armadura de Mandalorian',
            tipo: 'texto',
            fecha: new Date('2024-12-01T10:00:00'),
            leido: true
          },
          {
            id: 'msg_002',
            remitenteId: 'usr_vend_1',
            destinatarioId: 'usr_1',
            contenido: '¡Hola! Claro, te comento los detalles',
            tipo: 'texto',
            fecha: new Date('2024-12-01T10:05:00'),
            leido: true
          },
          {
            id: 'msg_003',
            remitenteId: 'usr_vend_1',
            destinatarioId: 'usr_1',
            contenido: 'Avance del casco',
            tipo: 'avance',
            adjuntoUrl: 'https://picsum.photos/300/200?random=20',
            fecha: new Date('2024-12-03T15:30:00'),
            leido: false
          }
        ],
        ultimoMensaje: {
          id: 'msg_003',
          remitenteId: 'usr_vend_1',
          destinatarioId: 'usr_1',
          contenido: 'Avance del casco',
          tipo: 'avance',
          adjuntoUrl: 'https://picsum.photos/300/200?random=20',
          fecha: new Date('2024-12-03T15:30:00'),
          leido: false
        },
        productoId: 'prod_001'
      }
    ];
    
    this.conversaciones.set(convs);
  }
  
  enviarMensaje(conversacionId: string, contenido: string, tipo: 'texto' | 'ubicacion' = 'texto') {
    const convs = this.conversaciones();
    const idx = convs.findIndex(c => c.id === conversacionId);
    if (idx !== -1) {
      const nuevoMensaje: Mensaje = {
        id: 'msg_' + Date.now(),
        remitenteId: 'usr_1',
        destinatarioId: 'usr_vend_1',
        contenido,
        tipo,
        fecha: new Date(),
        leido: false
      };
      convs[idx].mensajes.push(nuevoMensaje);
      convs[idx].ultimoMensaje = nuevoMensaje;
      this.conversaciones.set([...convs]);
    }
  }
}
