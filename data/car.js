class Car {

  brand;
  model;
  speed = 0;
  isTrunkOpen = false;
  
  constructor (carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo () {
    const trunkStatus = this.isTrunkOpen ? 'Open' : 'Close';
    
    console.log(`Brand: ${this.brand} | Model: ${this.model} | Speed: ${this.speed} | Trunk: ${trunkStatus}`);
  }

  go () {
    if (this.isTrunkOpen === false) {
      if (this.speed < 200) {
        this.speed += 5;
      }
    } else {
      console.log(`Cannot drive while trunk is open!`);
    }

    this.displayInfo();
  }

  brake () {
    if (this.speed >= 5) {
      this.speed -= 5;
    }
    this.displayInfo();
  }

  openTrunk () {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    } else {
      console.log(`Can't open trunk while car is moving!`);
    }
    this.displayInfo();
  }

  closeTrunk () {
    this.isTrunkOpen = false;
    this.displayInfo();
  }

}

class RaceCar extends Car {
  acceleration;

  constructor (carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go () {
    if (this.speed < 300) {
      this.speed += this.acceleration;
    }
    this.displayInfo();
  }

  openTrunk () {
    console.log('Trunk is not available in race cars');
  }

  closeTrunk () {
    console.log('Trunk is not available in race cars');
  }
}

const car1 = new Car({brand:'Toyota', model:'Corolla'});
const car2 = new Car({brand:'Tesla', model:'Model 3'});
const car3 = new RaceCar({brand:'McLaren', model:'F1', acceleration:100});

console.log(car1);
console.log(car2);
console.log(car3);

// car1.displayInfo();
// car2.displayInfo();
// car3.displayInfo();

// car1.go();
// car1.go();
// car1.go();
// car1.go();
// car1.go();

// car1.brake();
// car1.brake();
// car1.brake();
// car1.brake();

// car1.openTrunk();

// car1.brake();

// car1.openTrunk();

// car1.go();

car3.go();
car3.go();
car3.openTrunk();
car3.go();
car3.go();

