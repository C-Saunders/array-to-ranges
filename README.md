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

It also works with more complex values:
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

## Contributing
Issues and pull requests welcome. Please be nice.

* Run tests with `npm run test`
* Lint with `npm run lint`

## License
[MIT](https://opensource.org/licenses/MIT)
