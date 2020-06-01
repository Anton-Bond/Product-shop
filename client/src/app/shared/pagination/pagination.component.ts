import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  // offset that is used currently
  @Input() offset: number = 0;
  // size of each page
  @Input() limit: number = 1;
  // total amount of items
  @Input() size: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  // array of page numbers
  pages: number[] = [];
  currentPage: number;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.getPages(this.offset, this.limit, this.size);
    // filling in numbers
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  ngOnChanges() {
    this.getPages(this.offset, this.limit, this.size);
  }

  getPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  selectPage(page: number, event) {
    this.cancelEvent(event);
    if (this.isValidPageNumber(page, this.totalPages)) {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }

  cancelEvent(event) {
    event.preventDefault();
  }
}
