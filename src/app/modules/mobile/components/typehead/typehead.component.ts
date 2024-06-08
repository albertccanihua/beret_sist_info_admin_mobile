import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-typehead',
  templateUrl: './typehead.component.html',
  styleUrls: ['./typehead.component.scss'],
})
export class TypeheadComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredItems: Item[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  trackItems(index: number, item: Item) {
    return item.value;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  filterList(searchQuery: string | undefined) {
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => {
        return item.text.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((item) => item === value);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((item) => item !== value);
    }
  }

}
