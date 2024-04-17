import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
  }

}
