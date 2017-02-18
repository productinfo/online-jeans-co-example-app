
const commands = require('commands');
const moment = require('moment');

const dateRange = 365;
const startDate = moment().subtract(dateRange, 'days');

const deliveryCountries = [
   'United Kingdom',
   'Germany',
   'France',
   'Spain',
   'Italy',
   'Norway',
   'Sweden',
   'Finland',
   'Portugal',
   'Iceland'
];

const manufacturers = [
   'The Hipster Jeans Company',
   'Denzil Jeans',
   'Wrangled Jeans'
];

const genders = [
   'M',
   'F'
];

const sizes = {
   M: [
      '30/30', '30/32', '32/30', '32/32', '32/34', '34/32', '34/34'
   ],
   F: [
      10, 12, 14, 16, 18, 20
   ]
};

const colors = [
   'Red', 'Dark Blue', 'Light Blue', 'Yellow'
];

const styles = [
   'Relaxed', 'Skinny', 'Boot Cut'
];

const random = (source) => {
   return source[Math.floor(Math.random() * source.length)];
};

const createRecord = () => {
   let gender = random(genders);
   let date = moment(startDate).add(Math.random() * dateRange, 'days');

   return {
      orderDate: date,
      deliveryCountry: random(deliveryCountries),
      manufacturer: random(manufacturers),
      gender: gender,
      size: random(sizes[gender]),
      color: random(colors),
      style: random(styles)
   };
};

console.log(
   JSON.stringify(
      Array.from({length: commands.get('count', 5000)}).map(createRecord),
      null,
      2
   )
);
