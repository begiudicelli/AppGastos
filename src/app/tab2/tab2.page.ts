import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { Compra } from '../compras/compra';
import { ComprasService } from '../services/compras.service';

import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class Tab2Page implements OnInit{
  compras: Compra[] = [];

  constructor(private compraService: ComprasService) {
    addIcons({cartOutline})
  }

  ngOnInit(): void {
      this.carregarCompras();
  }
  
  carregarCompras(event?: any) {
    this.compraService.getCompras().subscribe({
      next: (dados) => {
        this.compras = dados;
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar compras:', err);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

}
