import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { closeSidePanel, openSidePanel } from '../../redux/home.actions';
import { RootState } from '../../redux';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'test';
  openPanel: boolean = false;
  formTorneo!: FormGroup;

  showFiller = false;

  torneos: { endDate: Date; id: number; startDate: Date; title: string }[] = [];

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.formTorneo = this.formBuilder.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.carService.getAllTorneos().subscribe((res) => {
      console.log('RESPONSE CARS: ', res);
      this.torneos = res;
    });

    this.store
      .select((s: any) => s.home)
      .subscribe((s) => {
        console.log('STORE: ', s);
        this.openPanel = s.sidePanel;
        console.log('RESPONSE CARS: ', s, this.openPanel);
      });
  }

  /**
   * Logout to go to Login view
   * @public
   */
  public onLogout(): void {
    this.authService.logout();
  }

  onOpenSidePanel() {
    this.store.dispatch(openSidePanel());
  }

  onCloseSidePanel() {
    this.store.dispatch(closeSidePanel());
  }

  sidePanel() {
    if (!this.openPanel) {
      this.onOpenSidePanel();
    } else {
      this.onCloseSidePanel();
    }
  }

  onCreateTorneo() {
    console.log(this.formTorneo.value);
    if (this.formTorneo.valid) {
      this.carService.postTorneo(this.formTorneo.value).subscribe((res) => {
        console.log('Torneo publicado');
        this.openPanel = !this.openPanel;
        window.location.reload();
      });
    }
  }
}
