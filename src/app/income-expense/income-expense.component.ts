import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IncomeExpense } from '../models/income-expense.model';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css'],
})
export class IncomeExpenseComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private incomeExpenseService: IncomeExpenseService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.formBuild.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { description, amount, type } = this.form.value;
    const item = new IncomeExpense(description, type, amount);
    console.log(item);
    this.incomeExpenseService
      .createIncomeExpense(item)
      .then((response) => {
        this.form.reset();
        console.log(response);
        Swal.fire(
          'Confirmación',
          'Información guardada exitosamente',
          'success'
        );
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  }
}
