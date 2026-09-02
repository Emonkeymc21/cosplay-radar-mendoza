import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/onboarding.component').then(m => m.OnboardingComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/role-select',
    loadComponent: () => import('./pages/auth/role-select.component').then(m => m.RoleSelectComponent)
  },
  {
    path: 'auth/zone-select',
    loadComponent: () => import('./pages/auth/zone-select.component').then(m => m.ZoneSelectComponent)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'mercado',
    loadComponent: () => import('./pages/mercado/mercado.component').then(m => m.MercadoComponent)
  },
  {
    path: 'mercado/producto/:id',
    loadComponent: () => import('./pages/mercado/producto-detalle.component').then(m => m.ProductoDetalleComponent)
  },
  {
    path: 'mercado/checkout/:id',
    loadComponent: () => import('./pages/mercado/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./pages/eventos/eventos.component').then(m => m.EventosComponent)
  },
  {
    path: 'eventos/:id',
    loadComponent: () => import('./pages/eventos/evento-detalle.component').then(m => m.EventoDetalleComponent)
  },
  {
    path: 'mensajes',
    loadComponent: () => import('./pages/mensajes/mensajes.component').then(m => m.MensajesComponent)
  },
  {
    path: 'mensajes/chat/:id',
    loadComponent: () => import('./pages/mensajes/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
  },
  {
    path: 'perfil/editar',
    loadComponent: () => import('./pages/perfil/editar-perfil.component').then(m => m.EditarPerfilComponent)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
