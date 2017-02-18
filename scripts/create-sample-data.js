
const commands = require('commands');
const moment = require('moment');

const dateRange = moment().startOf('month').subtract(1, 'day').date();
const startDate = moment().startOf('hour').subtract(dateRange, 'days');

const deliveryCountries = [
   'United Kingdom',
   'Germany',
   'France',
   'Spain',
   'Austria'
];

const manufacturers = [
   'The Hipster Jeans Company',
   'Denzil Jeans',
   'Wrangled Jeans'
];

const sizes = [
   '30/30', '30/32', '32/30', '32/32', '32/34',
   10,      12,      14,      16,      18,      20
];

const colors = [
   'Red', 'Dark Blue', 'Light Blue', 'Yellow'
];

const styles = [
   'Relaxed', 'Skinny', 'Boot Cut'
];

const reject = (input, rejector) => {
   for (let i = input.length - 1; i >= 0; i -= 1) {
      if (rejector(input[i], i, input)) {
         input.splice(i, 1);
      }
   }

   return input;
};

const flatten = (input) => {
   for (let i = input.length - 1; i >= 0; i -= 1) {
      if (Array.isArray(input[i])) {
         input.splice.apply(input, [i, 1].concat(input[i]));
      }
   }
   return input;
};

let records = Array.from({length: dateRange}).map(d => {
   let date = moment(startDate).subtract(dateRange, 'days');
   return {
      orderDate: date.toISOString(),
      year: date.year(),
      month: date.month(),
      date: date.date()
   };
});

flatten(records).forEach(function (item, index, all) {
   all[index] = deliveryCountries.map(deliveryCountry => {
      return Object.assign({ deliveryCountry: deliveryCountry }, item);
   });
});

flatten(records).forEach(function (item, index, all) {
   all[index] = manufacturers.map(manufacturer => {
      return Object.assign({ manufacturer: manufacturer }, item);
   });
});

flatten(records).forEach(function (item, index, all) {
   all[index] = sizes.map(size => {
      return Object.assign({ size: size, gender: typeof size === 'string' ? 'M' : 'F' }, item);
   });
});

flatten(records).forEach(function (item, index, all) {
   all[index] = colors.map(color => {
      return Object.assign({ color: color }, item);
   });
});

flatten(records).forEach(function (item, index, all) {
   all[index] = styles.map(style => {
      return Object.assign({ style: style }, item);
   });
});

flatten(records).forEach(function (item) {
   item.count = Math.floor(Math.random() * 25);
});

reject(records, item => item.count > 6);

console.log(
   JSON.stringify(records, null, 2)
);
