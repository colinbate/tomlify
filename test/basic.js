var t = require('../index.js');

var simple = {
  name: 'Colin',
  age: 32,
  working: true,
  drinks: false,
  GPA: 4.06,
  birthday: new Date(1982, 4, 9, 13, 18, 0),
  family: ['Lynne', 'Noah']
};

var nested = {
  name: 'Noah',
  schedule: {
    monday: 'crib',
    tuesday: 'nursery',
    wednesday: 'crib',
    thursday: 'nursery',
    friday: 'nursery',
    sunday: {
      morning: 'brunch',
      afternoon: 'nap'
    }
  }
};

var arrayOfObjects = {
  people: [
    {name: 'Colin', age: 32},
    {name: 'Lynne', age: 31},
    {name: 'Noah', age: 1}
  ]
};

var fruit = {
  "fruit": [
    {
      "name": "apple",
      "physical": {
        "color": "red",
        "shape": "round"
      },
      "variety": [
        { "name": "red delicious" },
        { "name": "granny smith" }
      ]
    },
    {
      "name": "banana",
      "variety": [
        { "name": "plantain" }
      ]
    }
  ]
};

console.log('--- SIMPLE ---');
console.log(t(simple, {delims: true}));
console.log('--- /SIMPLE ---');

console.log('--- NESTED ---');
console.log(t(nested, {indent: true}));
console.log('--- /NESTED ---');

console.log('--- ARRAY OF OBJECTS ---');
console.log(t(arrayOfObjects));
console.log('--- /ARRAY OF OBJECTS ---');

console.log('--- FRUIT ---');
console.log(t(fruit));
console.log('--- /FRUIT ---');