import { Component, OnInit  } from '@angular/core';
import { Content } from './content';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Content]
})



export class AppComponent implements OnInit {
  //title = 'mainstreaming-test-angular';
  
  public contents: any[] = [];

  currentPage: number;
  pageSize: number;
  title: string;

  constructor(private _Content: Content) {}

  ngOnInit(): void {
    
    this._Content.getJSON().subscribe(response => {
      this.contents = response.data.contents;
    });

    this.currentPage = 1;
    this.pageSize = 10;

    // Polling for 60 seconds API call
    setInterval(() => {  
      var now = <any>new Date().getTime();
      var setupTime = <any>localStorage.getItem('setupTime');
      if (setupTime == null) {
          localStorage.setItem('setupTime', now);
      } else {
          if( now - setupTime > 60 * 1000) {
              localStorage.clear()
              localStorage.setItem('setupTime', now);
              console.log('1 minute call');
              this._Content.getJSON().subscribe(response => {
                this.contents = response.data.contents;
              });
          }
        }
    }, 1000);
  
  }

  numberOfPages() {
    return Math.ceil(this.contents.length / this.pageSize);
  }

  searchByTheTitle() {
    if(this.title != "") {
      this.contents = this.contents.filter((result => {
        return result.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
      }))
    } else if(this.title == "") {
      this.ngOnInit();
    }
    
  }
}

 
