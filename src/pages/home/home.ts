import { Component } from '@angular/core';

import { NavController, AlertController} from 'ionic-angular';
// import of angular fire and firebase from angularfire2
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
    trips: FirebaseListObservable<any>;
// constructor for what database to call and where from
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.trips = angFire.database.list('/Trips');
  }
  
  // addTrip method
  addTrip():void {
      // prompt to create
    let prompt = this.alertCtrl.create({
        title: 'Enter Trip Details',
        // all the details to input into user trips
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
            },
            {
                name: 'passengers',
                placeholder: "Passenger"
            }
        ],
        // buttons at the end of the form (Cancel, Create)
        buttons: [
            {
                text: "Cancel"
            }, // end Cancel
            {
                text: "Create Trip",
                handler: data => {
                    // adds the data to the my trips 
                    this.trips.push({
                        name: data.name,
                        Number: data.Number,
                        hotelName: data.hotelName,
                        hotelAdd: data.hotelAdd,
                        transfer: data.transfer,
                        activities: data.activities,
                        passengers: data.passengers
                    }) // end push
                } // end handler
            } // end create
        ] // end buttons
    }); // end create prompt 
    
    prompt.present(); // presents the prompt request
    
  } // end addTrip
  
  // editTrip. Calls trip database object
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
            },
            {
                name: 'passengers',
                placeholder: trip.passengers
            }
        ],
        buttons: [
            {
                text: "Cancel",
            },
            {
                text: "Edit Trip",
                handler: data => {
                    // tells app to let new details entered to replace existing
                    let newName:String = trip.name;
                    let newNumber:String = trip.Number;
                    let newHotelName:String = trip.hotelName;
                    let newHotelAdd:String = trip.hotelAdd;
                    let newTransfer:String = trip.transfer;
                    let newActivities:String = trip.activities;
                    let newPassengers:String = trip.passengers;
                    
                    // tells app that if no new value entered leave existing detail there
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
                    if(data.passengers != ''){
                        newPassengers = data.passengers;
                    }
                    
                    // returns the updated values entered by a user
                    this.trips.update(trip.$key,{
                        name: newName,
                        Number: newNumber,
                        hotelName: newHotelName,
                        hotelAdd: newHotelAdd,
                        transfer: newTransfer,
                        activities: newActivities,
                        passengers: newPassengers
                    }) // end update
                } // end handler
            } // end Edit
        ] // end buttons
    }); // end prompt
    
    prompt.present(); // presents the prompt request
} // end editTrip
    
    // deleteTrip. Call tripID from trip.$key
    deleteTrip(tripID):void {
    let prompt = this.alertCtrl.create({
        title: 'Delete trip',
        buttons: [
            {
                text: "Cancel"
            },
            {
                text: "Delete Trip",
                handler: data => {
                    this.trips.remove(tripID)
                } // end handler to remove trip
            } // end text
        ] // end buttons
    }); // end prompt
    
    prompt.present(); // presents the prompt request
    
  } // end deleteTrip

} // end main