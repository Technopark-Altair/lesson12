import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-app-scss';
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true })
  })
  myControl = new FormControl('');
  options: string[] = [];


  filteredOptions!: Observable<string[]>;
  ngOnInit() {
    this.initFiltetedOptions()
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  initFiltetedOptions(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  addNewOption() {
    const name = this.form.value.name || ''
    this.options.push(name)
    this.initFiltetedOptions()
  }
}
