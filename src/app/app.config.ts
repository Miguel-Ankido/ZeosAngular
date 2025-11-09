import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

// 1. IMPORTE O HTTPCLIENT
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({ /* ...config... */ }),
    
    // 2. ADICIONE AQUI
    provideHttpClient() // Permite que o app faça chamadas de API
  ]
};