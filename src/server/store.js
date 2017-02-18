
const FS = require('fs');

const getData = (input) => new Promise(resolve => {

   if (Array.isArray(input)) {
      return resolve(input);
   }

   FS.readFile(input, 'utf8', (err, data) => {
      resolve(JSON.parse(data));
   });

});

function Summary (field, fields) {
   this.name = field;
   this.total = 0;
   fields.forEach(name => this[name] = {});

   this.update = (item) => {
      this.total += item.count;
      fields.forEach(name => {
         this[name][item[name]] = (this[name][item[name]] || 0) + item.count;
      });
   };
}

module.exports = function Store (sourceFilePath) {

   let data = [];

   this.summarise = function summarise (field, fields) {

      return Array.from(data.reduce(function (summary, item) {

         if (!summary.has(item[field])) {
            summary.set(item[field], new Summary(item[field], fields));
         }

         summary.get(item[field]).update(item);

         return summary;

      }, new Map()).values());


   };


   getData(sourceFilePath).then(d => data.push.apply(data, d));
};
