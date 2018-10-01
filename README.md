# array-to-ranges

### A utility to create "range" objects from arrays.

## API
```ts
interface Range<T> {
  start: T;
  end: T;
}

// Return true if the next value *should be included* in the range
type EndRangePredicate<T> = (current: T, next: T) => boolean;

function arrayToRanges<T>(values: Array<T>, predicate: EndRangePredicate<T>): Array<Range<T>>
```

## Usage
The data should be sorted so that your predicate is logical.
```ts
import { arrayToRanges } from 'array-to-ranges';

// Design your predicates carefully!
const countingUp = (current, next) => next - current === 1 || next - current === 0;

require('assert').deepEqual(
  arrayToRanges([1, 2, 3, 6, 7, 8], countingUp),
  [{ start: 1, end: 3 }, { start: 6, end: 8 }]
);
```

It works with more complex values:
```ts
const objectCountDown = (current, next) => current.a - next.a === 0 || current.a - next.a === 1;

require('assert').deepEqual(arrayToRanges([
  {
    a: 3,
    b: 17,
  },
  {
    a: 2,
    b: 'foo',
  },
  {
    a: 2,
    b: 4,
  },
  {
    a: 1,
    b: 'bar',
  }
], objectCountDown),
  [{
    start: {
      a: 3,
      b: 17,
    },
    end: {
      a: 1,
      b: 'bar'
    },
  }]
);
```

And fancy stuff:
```ts
import * as moment from 'moment';
import { arrayToRanges } from 'array-to-ranges';
import * as assert from 'assert';

const values = [
  moment('2018-09-01'),
  moment('2018-09-02'),
  moment('2018-09-03'),
  moment('2018-09-04'),
  moment('2018-09-07'),
  moment('2018-09-08'),
  moment('2018-09-08'),
  moment('2018-09-09'),
  moment('2018-09-19'),
];

const result = arrayToRanges(
  values,
  (curr: moment.Moment, next: moment.Moment) => curr.isSame(next) || curr.diff(next, 'days') === -1,
);

assert.deepEqual(result, [
  {
    start: moment('2018-09-01'),
    end: moment('2018-09-04'),
  },
  {
    start: moment('2018-09-07'),
    end: moment('2018-09-09'),
  },
  {
    start: moment('2018-09-19'),
    end: moment('2018-09-19'),
  }
]);
```

## Contributing
Issues and pull requests welcome. Please be nice.

* Run tests with `npm run test`
* Lint with `npm run lint`

## License
[MIT](https://opensource.org/licenses/MIT)
