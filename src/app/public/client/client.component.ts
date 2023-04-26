import { Component, ElementRef, HostListener, AfterViewInit, OnDestroy, ViewChild } from "@angular/core";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"],
})
export class ClientComponent implements AfterViewInit, OnDestroy {
  
  constructor() {}

  @ViewChild('myElement') myElement!: ElementRef;
  fixedPosition: number = 0;
  isFixedPositionReached: boolean = false;
  element!: HTMLElement;

  ngAfterViewInit(): void {
    this.element = this.myElement.nativeElement;
    this.fixedPosition = this.element.getBoundingClientRect().top;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll = (event:any) => {
    const currentPosition = window.pageYOffset;
    if (currentPosition >= this.fixedPosition && !this.isFixedPositionReached) {
      console.log('Fixed position reached');
      this.isFixedPositionReached = true;
      // Call your function here
    } else if (currentPosition < this.fixedPosition && this.isFixedPositionReached) {
      console.log('Fixed position not reached');
      this.isFixedPositionReached = false;
    }
  }
}
