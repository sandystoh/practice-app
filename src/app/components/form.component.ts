import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DexieService } from '../services/dexie.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  countries = ['', 'USA', 'Germany', 'Italy', 'France'];
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dexieSvc: DexieService,
              private snackBar: MatSnackBar, private router: Router) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  get f() { return this.contactForm.controls; }

  createFormGroup() {
    // tslint:disable-next-line:quotemark max-line-length
    const emailPattern = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,
        Validators.pattern(emailPattern)]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  cancel() {
    this.contactForm.reset();
  }

  onSubmit() {
    this.dexieSvc.getAll()
    .then(result => {
      if ((result.find(x => x.lastName === this.contactForm.value.lastName)) === undefined) {
        this.dexieSvc.add(this.contactForm.value).then(() => {
          this.snackBar.open('New User ' + this.contactForm.value.firstName + ' Added!', 'OK', { duration: 2000});
          this.dexieSvc.getAll().then(res => console.log('result', res));
          this.contactForm.reset();
          this.router.navigate(['/']);
        });

      } else {
        this.snackBar.open('Sorry! This user has already been added.', 'OK', { duration: 2000});
        this.contactForm.reset();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
