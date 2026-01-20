import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from '../components/user/user.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, UserComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
