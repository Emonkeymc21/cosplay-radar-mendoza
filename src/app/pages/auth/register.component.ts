import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <a routerLink="/auth/login" class="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6">
            ← Volver al login
          </a>
          <div class="inline-flex items-center justify-center w-16 h-16 bg-accent-500 rounded-2xl text-white text-2xl font-bold shadow-xl shadow-accent-500/30 mb-4">
            ✨
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-800">Crear Cuenta</h1>
          <p class="text-gray-500 mt-1">Únete a la comunidad cosplay de Mendoza</p>
        </div>
        
        <div class="card p-6 sm:p-8">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input 
                type="text" 
                formControlName="nombre"
                placeholder="Tu nombre"
                class="input-field"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                formControlName="email"
                placeholder="tu@email.com"
                class="input-field"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                formControlName="password"
                placeholder="Mínimo 6 caracteres"
                class="input-field"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input 
                type="password" 
                formControlName="confirmarPassword"
                placeholder="Repite la contraseña"
                class="input-field"
              >
            </div>
            
            <div class="flex items-start gap-2">
              <input type="checkbox" formControlName="aceptaTerminos" class="mt-1">
              <label class="text-sm text-gray-600">
                Acepto los <a href="#" class="text-primary-600 font-semibold">términos y condiciones</a> y la 
                <a href="#" class="text-primary-600 font-semibold">política de privacidad</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              class="btn-primary w-full"
              [disabled]="registerForm.invalid || cargando()">
              @if (cargando()) {
                <span class="animate-spin inline-block">⏳</span>
                Creando cuenta...
              } @else {
                Crear Cuenta
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent {
  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
    aceptaTerminos: [false, Validators.requiredTrue]
  });
  
  cargando = signal(false);
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit() {
    if (this.registerForm.valid) {
      this.cargando.set(true);
      const { nombre, email, password } = this.registerForm.value;
      this.authService.register({ nombre: nombre!, email: email!, password: password! }).then(() => {
        this.cargando.set(false);
        this.router.navigate(['/auth/role-select']);
      });
    }
  }
}
