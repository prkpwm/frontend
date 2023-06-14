import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  originalUrl: string = '';
  shortUrl: string = '';
  title = 'frontend';
  answer = '';
  currentSearch = 1;
  waiting = false;
  @ViewChild('searchInput') searchInput:any;
  constructor(private http: HttpClient) { }

  shortenUrl(): void {
    this.waiting = true;
    if(!this.originalUrl) return;
    this.http
      .post<any>('http://localhost:3000/api/shorten', { originalUrl: this.originalUrl })
      .subscribe((response) => {
        this.shortUrl = response.shortUrl;
        this.waiting = false;

      });
  }

  originalyUrl() {
    this.waiting = true;
    if(!this.shortUrl) return;
    this.http
      .post<any>('http://localhost:3000/api/originalUrl', { shortUrl: this.shortUrl })
      .subscribe((response) => {
        this.originalUrl = response.originalUrl;
        this.waiting = false;
      });
  }

  search() {
    if(this.originalUrl) {
      this.shortenUrl();
    }else{
      this.originalyUrl();
    }

  }

  reset() {
    this.originalUrl = '';
    this.shortUrl = '';
  }


  onKeydown() {
    if (this.searchInput.nativeElement.value.length < 3) return;
  }
}
