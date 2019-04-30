/////////////////////////////////
// CODING CHALLENGE

/*
  Suppose that you're working in a small town administration, and you're in charge of two town elements:
  1. Parks
  2. Streets

  It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

  At an end-of-year meeting, your boss wants a final report with the following:
  1. Tree density of each park in the town (forumla: number of trees/park area)
  2. Average age of each town's park (forumla: sum of all ages/number of parks)
  3. The name of the park that has more than 1000 trees
  4. Total and average length of the town's streets
  5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

  All the report data should be printed to the console.

  HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

const streetSizeScale = new Map([
  // Maps maximium length to size classification
  [100, 'tiny'],
  [500, 'small'],
  [1000, 'normal'],
  [3000, 'big'],
  [5000, 'huge'],
]);

class TownElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends TownElement {
  constructor(name, buildYear, numOfTrees, area) {
    super(name, buildYear);

    this.area = area;
    this.numOfTrees = numOfTrees;
  }

  treeDensity() {
    return (this.numOfTrees / this.area).toFixed(2);
  }

  age() {
    return new Date().getFullYear() - this.buildYear;
  }
}

class Street extends TownElement {
  constructor(name, buildYear, length) {
    super(name, buildYear);

    this.length = length;
  }

  size() {
    if (this.length === undefined) return 'normal';

    const maxLength = Array.from(streetSizeScale.keys()).filter((key) => key > this.length)[0];
    return streetSizeScale.get(maxLength);
  }
}

class TownReport {
  constructor(parks, streets) {
    this.parks = parks;
    this.streets = streets;
  }

  finalReport() {
    console.log('===== TOWN REPORT =====');

    this.parksReport();
    this.streetsReport();
  }

  parksReport() {
    console.log('===== PARKS REPORT =====');

    this.parksTreeDensity();
    this.parksAvgAge();
    this.parksThousandTrees();
  }

  streetsReport() {
    console.log('===== STREETS REPORT =====');

    this.streetsLengths();
    this.streetsSizes();
  }

  // Helpers for parksReport
  parksTreeDensity() {
    this.parks.forEach(
      (park) => console.log(`${park.name} has ${park.treeDensity()} tree(s) per square meter.`)
    );
  }

  parksAvgAge() {
    const sumOfAges = this.parks.map((park) => park.age()).reduce((a, b) => a + b, 0);
    const avgAge = Math.round(sumOfAges / this.parks.length);

    console.log(`Parks in the town are ${avgAge} years old in average.`);
  }

  parksThousandTrees() {
    const greenerPark = this.parks.filter((park) => park.numOfTrees > 1000)[0];

    console.log(`${greenerPark.name} has more than 1.000 trees.`);
  }

  // Helpers for streetsReport
  streetsLengths() {
    const totalLength = this.streets.map((street) => street.length)
          .filter((street) => street !== undefined)
          .reduce((a, b) => a + b, 0);
    const avgLength = (totalLength / this.streets.length).toFixed(2);

    console.log(`Streets in the town are ${totalLength}m long. Each one has ${avgLength}m in average.`);
  }

  streetsSizes() {
    this.streets.forEach(
      (street) => console.log(`${street.name} is a ${street.size()} street.`)
    );
  }
}

const parks = [
  new Park('Ibirapuera', 1954, 1820, 3100),
  new Park('Villa Lobos', 1989, 800, 895),
  new Park('Água Branca', 1929, 100, 320),
];

const streets = [
  new Street('Rua da Abolição', 1916),
  new Street('Rua Augusta', 1875, 3020),
  new Street('Rua Açaipé', 1962, 300),
];

const townReport = new TownReport(parks, streets);
townReport.finalReport();
