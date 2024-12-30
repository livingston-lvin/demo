import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Paginator } from '../../interfaces/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  imports: [CommonModule],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input('from') from!: number;
  @Input('to') to!: number;
  @Input('records') records!: number;
  @Input('size') size!: number;
  @Output('page') page: EventEmitter<any> = new EventEmitter<any>();

  pages: Paginator[] = [];
  currentPage!: Paginator | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.initData();
    }
  }

  initData() {
    this.pages.splice(0);
    this.currentPage = undefined;
    // if size is less than 10, then create pages for that size
    // else create page pages of size 10
    if (this.size > 0) {
      if (this.size <= 10) this.push(this.size);
      else this.push(10);

      // set first page to active
      this.pages[0]['active'] = true;
      this.currentPage = this.pages[0];
    }
  }

  push(length: number) {
    for (let i = 0; i < length; i++)
      this.pages.push({ pageNo: i + 1, active: false, index: i });
  }

  previous(emit: boolean, targetIndex: number) {
    const currentIndex = this.currentPage!.index;

    // paginator not reached the start
    if (currentIndex > 0) this.reset();
    else return;

    this.pages[targetIndex]['active'] = true;
    this.currentPage = this.pages[targetIndex];

    const currentPageNo = this.currentPage.pageNo;

    if (emit) this.emitPage();

    if (targetIndex === 0 && currentPageNo > 1) {
      this.pages.pop();
      const page: Paginator = {
        pageNo: currentPageNo - 1,
        active: false,
        index: 0,
      };
      this.pages.splice(0, 0, page);
      this.syncIndex();
    }
  }

  next(emit: boolean, targetIndex: number) {
    let currentPageNo = this.currentPage!.pageNo;

    // paginator not reached the end
    if (currentPageNo < this.size) this.reset();
    else return;

    //  page: 1 - 8
    this.pages[targetIndex]['active'] = true;
    this.currentPage = this.pages[targetIndex];

    currentPageNo = this.currentPage.pageNo;

    // page: 9 - size
    if (targetIndex === 9 && currentPageNo + 1 <= this.size) {
      this.pages.splice(0, 1);
      this.pages.push({ pageNo: currentPageNo + 1, active: false, index: 0 });
      this.syncIndex();
    }

    if (emit) this.emitPage();
  }

  navigate(pageNo: number, targetIndex: number) {
    const currentPageNo = this.currentPage!.pageNo;
    if (pageNo > currentPageNo) {
      this.next(false, targetIndex);
    } else if (pageNo < currentPageNo) {
      this.previous(false, targetIndex);
    }
    if (pageNo !== currentPageNo) this.emitPage();
  }

  emitPage() {
    this.page.emit(this.currentPage!.pageNo);
  }

  reset() {
    this.pages.forEach((page) => (page.active = false));
  }

  syncIndex() {
    this.pages.forEach((page, i) => (page.index = i));
  }
}
