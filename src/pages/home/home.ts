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
  
  editTrip(trip):void {
    let prompt = this.alertCtrl.create({
        title: 'Edit trip',
        inputs: [
            {
                name: 'name',
                placeholder: trip.name
            },
            {                
                name: 'Number',
                placeholder: trip.Number
            },
            {
                name: 'hotelName',
                placeholder: trip.hotelName
            },
            {
                name: 'hotelAdd',
                placeholder: trip.hotelAdd
            },
            {
                name: 'transfer',
                placeholder: trip.transfer
            },
            {
                name: 'activities',
                placeholder: trip.activities
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
                text: "Edit Trip",
                handler: data => {
                    let newName:String = trip.name;
                    let newNumber:String = trip.Number;
                    let newHotelName:String = trip.hotelName;
                    let newHotelAdd:String = trip.hotelAdd;
                    let newTransfer:String = trip.transfer;
                    let newActivities:String = trip.activities;
                    
                    if(data.name !=''){
                        newName = data.name;
                    }
                    
                     if(data.Number !=''){
                        newNumber = data.Number;
                    }
                    
                     if(data.hotelName !=''){
                        newHotelName = data.hotelName;
                    }
                    
                     if(data.hotelAdd !=''){
                        newHotelAdd = data.hotelAdd;
                    }
                    
                     if(data.transfer !=''){
                        newTransfer = data.transfer;
                    }
                    
                     if(data.activities !=''){
                        newActivities = data.activities;
                    }
                    
                    this.trips.update(trip.$key,{
                        name: newName,
                        Number: newNumber,
                        hotelName: newHotelName,
                        hotelAdd: newHotelAdd,
                        transfer: newTransfer,
                        activities: newActivities
                    })
                }
            }
        ]
    });
    
    prompt.present();
}
    
    deleteTrip(tripID):void {
    let prompt = this.alertCtrl.create({
        title: 'Delete trip',
        buttons: [
            {
                text: "Cancel",
                handler: data => {
                    console.log("Cancel clicked");
                }
            },
            {
                text: "Delete Trip",
                handler: data => {
                    this.trips.remove(tripID)
                }
            }
        ]
    });
    
    prompt.present();
    
  }

}
