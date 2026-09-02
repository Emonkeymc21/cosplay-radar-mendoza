import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-500 rounded-3xl text-white text-3xl font-bold shadow-xl shadow-primary-500/30 mb-4">
            CR
          </div>
          <h1 class="text-3xl font-display font-bold text-gray-800">Cosplay Radar</h1>
          <p class="text-gray-500 mt-1">Bienvenido a la comunidad cosplay de Mendoza</p>
        </div>
        
        <div class="card p-6 sm:p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                formControlName="email"
                placeholder="tu@email.com"
                class="input-field"
                [class.border-red-300]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              >
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                <p class="text-xs text-red-500 mt-1">Ingresa un email válido</p>
              }
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                formControlName="password"
                placeholder="••••••••"
                class="input-field"
                [class.border-red-300]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              >
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <p class="text-xs text-red-500 mt-1">La contraseña debe tener al menos 6 caracteres</p>
              }
            </div>
            
            <button 
              type="submit" 
              class="btn-primary w-full"
              [disabled]="loginForm.invalid || cargando()">
              @if (cargando()) {
                <span class="animate-spin inline-block">⏳</span>
                Iniciando sesión...
              } @else {
                Iniciar Sesión
              }
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              ¿No tienes cuenta?
              <a routerLink="/auth/register" class="text-primary-600 font-semibold hover:underline">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  cargando = signal(false);
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.cargando.set(true);
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!).then(() => {
        this.cargando.set(false);
        this.router.navigate(['/auth/role-select']);
      }).catch(() => {
        this.cargando.set(false);
      });
    }
  }
}
