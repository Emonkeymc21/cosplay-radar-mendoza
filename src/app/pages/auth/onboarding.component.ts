import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 flex flex-col">
      <div class="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl text-white text-4xl font-bold shadow-2xl mb-6">
            CR
          </div>
          <h1 class="text-5xl font-display font-bold text-white mb-4">Cosplay Radar</h1>
          <p class="text-xl text-white/90 mb-2">Mendoza</p>
          <p class="text-white/80 max-w-sm">
            La comunidad de cosplay más grande de la región. Encuentra productos, eventos y conecta con otros cosplayers.
          </p>
        </div>
        
        <div class="flex gap-3 mb-8">
          <span class="w-2 h-2 bg-white rounded-full"></span>
          <span class="w-2 h-2 bg-white/50 rounded-full"></span>
          <span class="w-2 h-2 bg-white/50 rounded-full"></span>
        </div>
      </div>
      
      <div class="px-6 pb-8">
        <a routerLink="/auth/login" class="btn-primary w-full bg-white text-primary-600 hover:bg-gray-100 shadow-xl">
          Comenzar
        </a>
        <a routerLink="/auth/register" class="block text-center text-white mt-4 font-semibold hover:underline">
          Crear cuenta
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class OnboardingComponent {}
