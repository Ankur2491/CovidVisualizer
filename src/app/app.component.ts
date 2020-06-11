import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mainData: Array<any> = [];
  responseData: any;
  myForm: FormGroup;
  countries = ['India'];
  states = [];
  districts = [];
  reportData = {};
  showMainData = true;
  colorScheme = {
    domain: []
  };

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get('https://api.covid19india.org/state_district_wise.json').subscribe((data: Array<any>) => {
      this.states = Object.keys(data);
      this.responseData = data;
      for (const [key, value] of Object.entries(data)) {
        let tot = 0;
        for (const [dis, val] of Object.entries(value.districtData)) {
          tot = tot + val['active'];
        }
        let obj = {};
        obj["name"] = key;
        obj["value"] = tot;
        this.mainData.push(obj);
        this.colorScheme.domain.push(this.getRandomColor());
      }
      console.log(this.mainData.length);
      this.mainData = this.mainData.slice(0, 37);
      this.mainData.sort((a, b) => { if (a.value < b.value) return 1; if (a.value > b.value) return -1; return 0; });
      Object.assign(this, new Object(this.mainData));
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      country: [''],
      state: [''],
      district: ['']
    })
  }
  onSubmit(form: FormGroup) {
    this.generateReport(form.value);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateReport(data: any) {
    if (data.country && data.state && data.district) {
      this.reportData = this.responseData[data.state];
      this.reportData['districts'] = [];
      
      console.log("reportData:",this.reportData);
    }
    if (data.country && data.state) {
      this.reportData = this.responseData[data.state];
      this.reportData['districts'] = Object.keys(this.reportData['districtData']);
    }

  }
  toggleMainData() {
    this.showMainData = !this.showMainData;
  }
  onStateChange(e) {
    this.districts = Object.keys(this.responseData[e.target.value]['districtData']);
  }
}