import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { LoadingComponent } from '../../shared/components/loading-component/loading-component';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, UserComponent,LoadingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
