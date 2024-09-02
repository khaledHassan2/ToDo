import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteServiceService } from '../../core/services/flowbite-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private readonly _FlowbiteServiceService=inject(FlowbiteServiceService);
  private readonly _Router=inject(Router);
  ngOnInit(): void {
    this._FlowbiteServiceService.loadFlowbite(()=>{

    })
  }
  signOut():void{
    localStorage.removeItem('token');
    this._Router.navigate(['/signin']);

  }

}
