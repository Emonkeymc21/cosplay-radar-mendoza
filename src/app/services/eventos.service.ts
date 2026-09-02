import { Injectable, signal } from '@angular/core';
import { Evento } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private eventos = signal<Evento[]>([]);
  eventosDisponibles = this.eventos.asReadonly();
  
  constructor() {
    this.cargarEventos();
  }
  
  private cargarEventos() {
    const evs: Evento[] = [
      {
        id: 'evt_001',
        nombre: 'Mendotaku 2025',
        descripcion: 'El evento más grande de anime, cómics y cultura pop de Mendoza. Concursos de cosplay, artistas invitados, stands y mucho más.',
        fecha: new Date('2025-06-15T10:00:00'),
        fechaFin: new Date('2025-06-16T20:00:00'),
        ubicacion: 'Auditorio Ángel Bustelo',
        zona: 'Capital',
        banner: 'https://picsum.photos/800/400?random=10',
        organizador: 'Mendotaku Organization',
        precioEntrada: 15000,
        asistentes: [],
        lineup: [],
        galeria: [],
        rsvpAbierto: true,
        capacidad: 5000
      },
      {
        id: 'evt_002',
        nombre: 'Convención Anime Mendoza',
        descripcion: 'Convención dedicada al anime y manga. Concurso de cosplay con premios, karaoke, stands de comida japonesa.',
        fecha: new Date('2025-09-20T11:00:00'),
        ubicacion: 'Espacio Cultural Julio Le Parc',
        zona: 'Guaymallén',
        banner: 'https://picsum.photos/800/400?random=11',
        organizador: 'Anime Mendoza',
        precioEntrada: 8000,
        asistentes: [],
        lineup: [],
        galeria: [],
        rsvpAbierto: true,
        capacidad: 3000
      },
      {
        id: 'evt_003',
        nombre: 'Cosplay Meetup Plaza Independencia',
        descripcion: 'Encuentro mensual de cosplayers en Plaza Independencia. Sesión de fotos grupal, intercambio de tips y networking.',
        fecha: new Date('2025-03-01T15:00:00'),
        ubicacion: 'Plaza Independencia',
        zona: 'Capital',
        banner: 'https://picsum.photos/800/400?random=12',
        organizador: 'Cosplayers Mendoza',
        asistentes: [],
        lineup: [],
        galeria: [],
        rsvpAbierto: true,
        capacidad: 200
      },
    ];
    
    this.eventos.set(evs);
  }
  
  getEventoById(id: string): Evento | undefined {
    return this.eventos().find(e => e.id === id);
  }
  
  confirmarAsistencia(eventoId: string, usuarioId: string) {
    const eventos = this.eventos();
    const idx = eventos.findIndex(e => e.id === eventoId);
    if (idx !== -1) {
      const evento = eventos[idx];
      if (!evento.asistentes.some(a => a.id === usuarioId)) {
        evento.asistentes.push({ id: usuarioId } as any);
        this.eventos.set([...eventos]);
      }
    }
  }
}
