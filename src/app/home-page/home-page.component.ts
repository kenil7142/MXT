import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { BookRepairComponent } from '../header-module/book-repair/book-repair.component';
import { DriverComponent } from '../home-page/driver/driver.component';
import { MapService } from 'src/@theme/Services/map.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  Data: any[] = [];
  slider: any[] = [
    {
      id: 1,
      heading: 'Chemical Analysis',
      image:
        'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/WhatsApp%20Image%202022-01-31%20at%2012.19.50%20AM.jpeg?alt=media&token=12b54faa-ac8f-4caf-87d5-9dc763887021',
      content:
        "Chemical analysis is a process to determine chemical composition of material and see it is complying with their reference standard or not. Mechanical and metallurgical property of the material is largely depends on its chemistry.",
      buttonContent: 'Subscribe',
      created_at: '2021-03-20 12:06:38',
      updated_at: '2021-04-23 14:40:20',
      buttonURL: null,
    },
    {
      id: 2,
      heading: 'Mechanical Testing',
      image:
        'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/WhatsApp%20Image%202022-01-31%20at%2012.33.30%20AM.jpeg?alt=media&token=b8f14d76-caa7-44d7-bd58-82abb6aab3a6',
      content:
        "Mechanical testing is a process to determine physical properties of materials like tensile strength, yield strength, compression strength, bend strength, Impact value, hardness, elongation etc.",
      buttonContent: 'Subscribe',
      created_at: '2021-03-20 12:06:38',
      updated_at: '2021-04-23 14:40:20',
      buttonURL: null,
    },
    {
      id: 3,
      heading: 'Corrosion Testing',
      image:
        'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/WhatsApp%20Image%202022-01-31%20at%2012.18.19%20AM.jpeg?alt=media&token=c2d0a086-e22a-461b-b328-9188fb9c7c05',
      content:
        "Corrosion testing is use to measuring rate of corrosion specially in stainless steel in various corrosive environment. Intergranula corrosion and pitting corrosion are most common types of corrosion observed in stainless steel.",
      buttonContent: 'Subscribe',
      created_at: '2021-03-20 12:06:38',
      updated_at: '2021-04-23 14:40:20',
      buttonURL: null,
    },
    {
      id: 4,
      heading: 'Metallography Testing',
      image:
        'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/WhatsApp%20Image%202022-01-31%20at%2012.33.30%20AM.jpeg?alt=media&token=b8f14d76-caa7-44d7-bd58-82abb6aab3a6',
      content:
        "Metallography is the study of the materials structure, phase, phase distribution, grain size, inclusion rating etc. at higher magnification. It is very important in failure analysis of material.",
      buttonContent: 'Subscribe',
      created_at: '2021-03-20 12:06:38',
      updated_at: '2021-04-23 14:40:20',
      buttonURL: null,
    },
    // {
    //   id: 5,
    //   heading: 'Welcome To Metal X',
    //   image:
    //     'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/slider.jpeg?alt=media&token=810f8632-897a-48a2-b2ca-26df0bab9f37',
    //   content:
    //     "This word has two main meanings. The first has to do with being pleased and satisfied (feeling content) or making someone else feel happy and at peace with things (contenting them). The other meaning has to do with subject matter: the content of a history class might be American history. The content of a math class might be geometry. As long as there's a topic or subject, there's content.",
    //   buttonContent: 'Subscribe',
    //   created_at: '2021-03-20 12:06:38',
    //   updated_at: '2021-04-23 14:40:20',
    //   buttonURL: null,
    // },
    // {
    //   id: 6,
    //   heading: 'Welcome To Metal X',
    //   image:
    //     'https://firebasestorage.googleapis.com/v0/b/metalx-7f718.appspot.com/o/slider.jpeg?alt=media&token=810f8632-897a-48a2-b2ca-26df0bab9f37',
    //   content:
    //     "This word has two main meanings. The first has to do with being pleased and satisfied (feeling content) or making someone else feel happy and at peace with things (contenting them). The other meaning has to do with subject matter: the content of a history class might be American history. The content of a math class might be geometry. As long as there's a topic or subject, there's content.",
    //   buttonContent: 'Subscribe',
    //   created_at: '2021-03-20 12:06:38',
    //   updated_at: '2021-04-23 14:40:20',
    //   buttonURL: null,
    // },
  ];
  display: any[] = [];
  driveForm: FormGroup;
  area: any;
  invalidData: boolean = false;

  selectedImg = [
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
  ];

  lat: any;
  lng: any;
  Filter: boolean = false;

  Location = {
    lat: 0,
    lng: 0,
    Icon: {
      url: 'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      scaledSize: {
        width: 200,
        height: 100,
      },
    },
  };
  constructor(
    private modalService: NgbModal,
    private header: HeaderService,
    private router: Router,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.display.push(this.slider[0]);

    localStorage.setItem('filter', JSON.stringify(this.Filter));
    this.driveForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        ),
      ]),
      mobile_number: new FormControl(null, Validators.required),
    });

    localStorage.setItem('Location', JSON.stringify(this.Location));

    if (!navigator.geolocation) {
      console.log('location not found');
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.Location.lat = position.coords.latitude;
        this.Location.lng = position.coords.longitude;
        console.log(this.Location);

        localStorage.setItem('Location', JSON.stringify(this.Location));
        this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
        this.lat = this.Location.lat;
        this.lng = this.Location.lng;
      },
      (error) => {
        if (this.Location.lat == 0 && this.Location.lng == 0) {
          this.Location.lat = 33.448376;
          this.Location.lng = -112.074036;

          this.lat = this.Location.lat;
          this.lng = this.Location.lng;
          localStorage.setItem('Location', JSON.stringify(this.Location));
        }
      }
    );

    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    if (this.Location.lat == 0 && this.Location.lng == 0) {
      this.Location.lat = 33.448376;
      this.Location.lng = -112.074036;

      this.lat = this.Location.lat;
      this.lng = this.Location.lng;
    }

    localStorage.setItem('Location', JSON.stringify(this.Location));

    // this.header.slider().subscribe((data) => {
    //   // this.Data.push(data);
    //   this.slider = data['data'];

    //   // this.slider.push(this.Data[0].data);
    //   console.log(this.slider);
    // });

    // this.mapService.getArea(this.Location.lat, this.Location.lng).subscribe(
    //   (data: any) => {
    //     this.area = data.results[0].formatted_address;
    //     localStorage.setItem('Address', JSON.stringify(this.area));

    //     console.log(this.area);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  about() {
    this.router.navigate(['about']);
  }
  DriverReq() {
    console.log(this.driveForm.value);
    if (this.driveForm.valid) {
      this.header.driverReq(this.driveForm.value).subscribe(
        (response) => {
          console.log(response);
          console.log(response['status']);

          if (response['status']) {
            this.modalService.open(DriverComponent);
          } else {
            console.log('some fields are invalid');
          }

          this.driveForm.reset();
          this.invalidData = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.invalidData = true;
    }
  }
  bookRepair() {
    const modalRef = this.modalService.open(BookRepairComponent);
  }

  OnChange(obj: any) {
    this.display.pop();
    this.display.push(obj);
  }
}
