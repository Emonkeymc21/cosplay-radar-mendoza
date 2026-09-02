import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-4">
      <h1 class="text-3xl font-display font-bold text-gray-800 mb-6">Editar Perfil</h1>
      
      <div class="card p-6">
        <form [formGroup]="perfilForm" (ngSubmit)="guardar()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" formControlName="nombre" class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" formControlName="email" class="input-field">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input type="tel" formControlName="telefono" class="input-field" placeholder="+54 261...">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
            <textarea formControlName="bio" rows="4" class="input-field" placeholder="Cuéntanos sobre ti..."></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Redes Sociales</label>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">📸</span>
                <input type="text" formControlName="instagram" class="input-field" placeholder="Instagram">
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🐦</span>
                <input type="text" formControlName="twitter" class="input-field" placeholder="Twitter/X">
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button type="submit" class="btn-primary flex-1">Guardar Cambios</button>
            <button type="button" (click)="cancelar()" class="btn-secondary flex-1">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class EditarPerfilComponent {
  perfilForm = this.fb.group({
    nombre: [''],
    email: [''],
    telefono: [''],
    bio: [''],
    instagram: [''],
    twitter: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  guardar() {
    // Aquí se guardarían los cambios
    console.log('Perfil actualizado:', this.perfilForm.value);
    this.router.navigate(['/perfil']);
  }
  
  cancelar() {
    this.router.navigate(['/perfil']);
  }
}
