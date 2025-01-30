import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { KeyValue } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-chipper',
  imports: [FormsModule, MatFormField, MatSelect, MatOption, MatLabel, MatButton, ReactiveFormsModule, MatChip],
  templateUrl: './chipper.component.html',
  styleUrl: './chipper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipperComponent {
  mainOptions: KeyValue<string, string>[] = [
    { key: 'Building1', value: 'Building 1' },
    { key: 'Building2', value: 'Building 2' },
    { key: 'Building3', value: 'Building 3' }
  ];
  subOptions: KeyValue<string, string>[] = [
    { key: 'room1', value: 'Room 1' },
    { key: 'room2', value: 'Room 2' },
    { key: 'room3', value: 'Room 3' }
  ];

  selectedChips: KeyValue<string, string[]>[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      main: [''], sub: ['']
    })
  }

  addChip(key: string, newValue: string) {
    if (!key || !newValue) return;

    // Find if the key already exists
    const existingEntry = this.selectedChips.find(entry => entry.key === key);

    if (existingEntry) {
      // If found, add the new value to the existing array (if not already present)
      if (!existingEntry.value.includes(newValue)) {
        existingEntry.value.push(newValue);
        existingEntry.value.sort();
      }
    } else {
      // If not found, add a new entry
      this.selectedChips.push({ key, value: [newValue] });
    }

    this.selectedChips.sort((a, b) => a.key.localeCompare(b.key));
  }

  addEvent() {
    this.addChip(this.form.get('main')?.value, this.form.get('sub')?.value);
    console.table(this.selectedChips);
  }

  removeChip(key: string, value: string) {
    const existingEntry = this.selectedChips.find(entry => entry.key === key);
    if (existingEntry) {
      existingEntry.value = existingEntry.value.filter(v => v !== value);

      if (existingEntry.value.length === 0) {
        this.selectedChips = this.selectedChips.filter(entry => entry.key !== key);
      }
    }
  }
}
