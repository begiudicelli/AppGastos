import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController} from '@ionic/angular';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Compra } from '../compras/compra';
import { ComprasService } from '../services/compras.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule,  ReactiveFormsModule],
})

export class Tab1Page implements OnInit {
  formCompra!: FormGroup;

  constructor(private formBuilder: FormBuilder, private compraService: ComprasService, private toastController: ToastController) { }

  ngOnInit(): void {
    this.createForm(new Compra());
  }

  createForm(compra: Compra){
    this.formCompra = this.formBuilder.group({
      categoria: [compra.categoria],
      dataDaCompra: [compra.dataDaCompra.toISOString().substring(0,10)],
      observacao: [compra.observacao],
      valor: [compra.valor]
    })
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

  onSubmit() {
    if (this.formCompra.valid) {
      const novaCompra: Compra = this.formCompra.value;
      this.compraService.addCompra(novaCompra)
        .then(() => {
          this.presentToast('Compra salva com sucesso!', 'success');
          this.formCompra.reset();
        })
        .catch(() => {
          this.presentToast('Erro ao salvar compra.', 'danger');
        });
    }
  }
}

