import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAuth } from "./core/auth/auth.provider";
import { provideLoading } from "./shared/services/loading/loading.provider";

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideAnimationsAsync(),
      provideHttpClient(),
      provideAuth(),
      provideLoading(),
    ]
};
