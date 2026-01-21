import { Routes } from "@angular/router";
import { NoAuthGuard } from "./core/auth/guards/noAuth.guard";
import { SignInComponent } from "./modules/auth/sign-in/sign-in.component";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { LayoutComponent } from "./layout/layout-container/layout.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/tasks",
        pathMatch: "full"
    },
    {
        path: "",
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component:LayoutComponent,
        children: [
            {
              path: "tasks",
              loadChildren: () => import("./modules/tasks/tasks.routes")
            }
        ]
    },
    {
      path: "sign-in",
      canActivate: [NoAuthGuard],
      component: SignInComponent,
    }
];
