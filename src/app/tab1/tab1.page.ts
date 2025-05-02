import { Component, inject, OnInit } from '@angular/core';
import {
  IonButton, IonTextarea, IonInput, IonDatetime, IonLabel, IonList, IonCardContent, IonCardTitle, IonItem,
  IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Compra } from '../compras/compra';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonButton, IonTextarea, IonDatetime, IonInput, IonLabel, IonList, IonCardContent,
    IonCardTitle, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonCardHeader, ReactiveFormsModule],
})

export class Tab1Page implements OnInit {
  formCompra!: FormGroup;

  constructor(private formBuilder: FormBuilder, private compraService: ComprasService) { }

  ngOnInit(): void {
    this.createForm(new Compra());
  }

  createForm(compra: Compra){
    this.formCompra = this.formBuilder.group({
      nome: [compra.nome],
      categoria: [compra.categoria],
      dataDaCompra: [compra.dataDaCompra],
      observacao: [compra.observacao],
      valor: [compra.valor]
    })
  }

  onSubmit() {
    console.log(this.formCompra.value);
    if (this.formCompra.valid) {
      const novaCompra: Compra = this.formCompra.value;
      this.compraService.addCompra(novaCompra)
        .then(() => {
          console.log('Compra salva com sucesso!');
          this.formCompra.reset();
        })
        .catch((err) => {
          console.error('Erro ao salvar compra:', err);
        });
    }
  }
}

