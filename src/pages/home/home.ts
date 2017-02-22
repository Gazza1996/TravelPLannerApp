import { Component } from '@angular/core';

import { NavController, AlertController} from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    trips: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.trips = angFire.database.list('/Trips');
    
  }
  
  addTrip():void {
    let prompt = this.alertCtrl.create({
        title: 'Enter Trip Details',
        inputs: [
            {
                name: 'name',
                placeholder: "Trip Name"
            },
            {                
                name: 'Number',
                placeholder: "Flight Number"
            },
            {
                name: 'hotelName',
                placeholder: "Hotel Name"
            },
            {
                name: 'hotelAdd',
                placeholder: "Hotel Address"
            },
            {
                name: 'transfer',
                placeholder: "Transfer Details (If any)"
            },
            {
                name: 'activities',
                placeholder: "Activities"
            }
        ],
        buttons: [
            {
                text: "Cancel",
                handler: data => {
                    console.log("Cancel clicked");
                }
            },
            {
                text: "Create Trip",
                handler: data => {
                    this.trips.push({
                        name: data.name,
                        Number: data.Number,
                        hotelName: data.hotelName,
                        hotelAdd: data.hotelAdd,
                        transfer: data.transfer,
                        activities: data.activities
                    })
                }
            }
        ]
    });
    
    prompt.present();
  }

}
