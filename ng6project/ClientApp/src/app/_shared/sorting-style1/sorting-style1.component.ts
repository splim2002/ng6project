import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sorting-style1',
  templateUrl: './sorting-style1.component.html',
  styleUrls: ['./sorting-style1.component.scss']
})
export class SortingStyle1Component implements OnInit {
  @Input() isSortBy: boolean = false;
  @Input() isInDesc: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
