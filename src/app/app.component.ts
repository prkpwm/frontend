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



  @ViewChild('searchInput') searchInput: any;
  constructor(private http: HttpClient) {
    const path = window.location.pathname;
    if (path.length > 1) {
      this.waiting = true;
      this.http
        .post<any>('https://prkpwm-url-shortener.onrender.com/api/originalUrl', { shortUrl: path.replace('/', '') })
        .subscribe((response) => {
          if (response.originalUrl && /Not Found/.test(response.originalUrl) === false) {
            if (response.originalUrl.indexOf('http') === -1) {
              response.originalUrl = 'http://' + response.originalUrl;
            }
            this.waiting = false;
            window.open(response.originalUrl, '_self');

          }
        }
        );
    }
  }


  shortenUrl(): void {
    if (!this.originalUrl) return;
    this.waiting = true;
    this.http
      .post<any>('https://prkpwm-url-shortener.onrender.com/api/shorten', { originalUrl: this.originalUrl })
      .subscribe((response) => {
        this.shortUrl = response.shortUrl;
        this.waiting = false;
        this.answer = window.location.href + response.shortUrl;

      });
  }

  originalyUrl() {
    if (!this.shortUrl) return;
    this.waiting = true;
    this.http
      .post<any>('https://prkpwm-url-shortener.onrender.com/api/originalUrl', { shortUrl: this.shortUrl })
      .subscribe((response) => {
        this.originalUrl = response.originalUrl;
        this.waiting = false;
        this.answer = window.location.href + response.shortUrl;
      });
  }

  search() {
    if (this.originalUrl) {
      this.shortenUrl();
    } else {
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
