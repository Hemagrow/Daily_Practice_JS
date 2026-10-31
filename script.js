import { age } from './utilites/age.js'
import { name } from './utilites/name.js'

console.log(name, age)

// import { name } from './utilities/name.js';

// console.log(name);


class Cars{
    constructor(title, color, speed){
        this.title = title,
        this.color = color,
        this.speed = speed
    }
    info(){
        console.log(this.title, this.color, this.speed)
    }
    speeda(){
        console.log(this.color)
    }
}

const car1 = new Cars("BMW", "Black", 200);
car1.info()
car1.speeda()
console.log(car1.color)
