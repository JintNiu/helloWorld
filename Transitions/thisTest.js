// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     fullName: function () {
//         console.log(this.make + " " + this.model);
//         console.log(car.make + " " + car.model);
//     }
// }
// car.fullName();

// var car = {
//     make：'....' ;
//     func: () => { console.log（this.make） }
// }

// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     fullName: function () {
//         console.log(this.make + " " + this.model);
//         console.log(car.make + " " + car.model);
//     }
// }
// car.fullName();


// var make = "Mclaren";
// var model = "720s"
// function fullName() {
//     console.log(this.make + " " + this.model);
// }
// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     fullName: function () {
//         console.log(this.make + " " + this.model);
//     }
// }
// car.fullName(); // Lmborghini Huracán
// window.fullName(); // Mclaren 720S
// fullName(); // Mclaren 720S

// var make = "Mclaren";
// var model = "720s";
// var name = "Ferrari";
// console.log(this.name);


// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     name: null,
//     fullName: function () {
//         this.name = this.make + " " + this.model;
//         console.log(this.name);
//     }
// }
// var anotherCar = {
//     make: "Ferrari",
//     model: "Italia",
//     name: null
// }
// // anotherCar.name = car.fullName();
// car.fullName.call(anotherCar);
// console.log(car.name);
// console.log(anotherCar.name);

// var cars = [
//     { make: "Mclaren", model: "720s" },
//     { make: "Ferrari", model: "Italia" }
// ]
// var car = {
//     cars: [{ make: "Lamborghini", model: "Huracán" }],
//     fullName: function () {
//         console.log(this.cars[0].make + " " + this.cars[0].model);
//     }
// }
// var vehicle = car.fullName.bind(car);
// vehicle()

// var car = {
//     cars: [
//         { make: "Lamborghini", model: "Huracán" },
//         { make: "Mclaren", model: "720s" },
//         { make: "Ferrari", model: "Italia" }
//     ],
//     brand:"lamborghini",
//     fullName: function () {
//         var self=this;
//         this.cars.forEach((car)=>{
//             console.log(car.model + " " + self.brand);
//         })
//     }
// }
// car.fullName();



// Huracán undefined
// 720s undefined
// Italia undefined


// var car = {
//     make: "Lamborghini",
//     model: "Huracán",
//     fullName: function (cars) {
//         cars.forEach((vehicle)=>{
//             console.log(vehicle + " " + this.model);
//         })
//     }
// }
// car.fullName(['lambo', 'ferrari', 'porsche']);

make = "Porsche";
model = "Carerra";

var car = {
    make: "Lamborghini",
    model: "Huracán",
    fullName: function () {
        console.log(this.make + " " + this.model + " " + this);
    }
}
var truck = {
    make: "Tesla",
    model: "Truck",
    fullName: function (callback) {
        console.log(this.make + " " + this.model + " " + this);
        callback();
    }
}
truck.fullName(car.fullName.bind(car));



