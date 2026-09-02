import { Injectable, signal, computed } from '@angular/core';
import { Usuario, ZonaMendoza } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = signal<Usuario | null>(null);
  isAuthenticated = computed(() => this.usuarioActual() !== null);
  usuario = this.usuarioActual.asReadonly();
  
  constructor() {
    this.cargarUsuario();
  }
  
  private cargarUsuario() {
    const stored = localStorage.getItem('usuario_actual');
    if (stored) {
      try {
        this.usuarioActual.set(JSON.parse(stored));
      } catch (e) {
        console.error('Error cargando usuario:', e);
      }
    }
  }
  
  login(email: string, password: string): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación de login
        const usuario: Usuario = {
          id: 'usr_' + Date.now(),
          nombre: email.split('@')[0],
          email: email,
          rol: 'ambos',
          zonas: ['Capital'],
          calificacionPromedio: 4.5,
          resenasRecibidas: 12,
          verificado: true
        };
        this.usuarioActual.set(usuario);
        localStorage.setItem('usuario_actual', JSON.stringify(usuario));
        resolve(usuario);
      }, 800);
    });
  }
  
  register(datos: { nombre: string; email: string; password: string }): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario: Usuario = {
          id: 'usr_' + Date.now(),
          nombre: datos.nombre,
          email: datos.email,
          rol: 'cosplayer',
          zonas: [],
          calificacionPromedio: 0,
          resenasRecibidas: 0,
          verificado: false
        };
        this.usuarioActual.set(usuario);
        localStorage.setItem('usuario_actual', JSON.stringify(usuario));
        resolve(usuario);
      }, 800);
    });
  }
  
  seleccionarRol(rol: 'cosplayer' | 'cosmaker' | 'ambos') {
    const usuario = this.usuarioActual();
    if (usuario) {
      const actualizado = { ...usuario, rol };
      this.usuarioActual.set(actualizado);
      localStorage.setItem('usuario_actual', JSON.stringify(actualizado));
    }
  }
  
  seleccionarZonas(zonas: ZonaMendoza[]) {
    const usuario = this.usuarioActual();
    if (usuario) {
      const actualizado = { ...usuario, zonas };
      this.usuarioActual.set(actualizado);
      localStorage.setItem('usuario_actual', JSON.stringify(actualizado));
    }
  }
  
  logout() {
    this.usuarioActual.set(null);
    localStorage.removeItem('usuario_actual');
  }
}
