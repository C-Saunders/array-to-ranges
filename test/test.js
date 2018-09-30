import test from 'ava';
import { arrayToRanges } from '../dist/index';

const countingUp = (current, next) => next - current === 1 || next - current === 0;

test('empty input', t => {
  t.throws(() => arrayToRanges([], countingUp));
});

test('single item', t => {
  t.deepEqual(
    arrayToRanges([1], countingUp),
    [{
      start: 1,
      end: 1
    }]);
});

test('one repeated item', t => {
  t.deepEqual(arrayToRanges([1, 1], countingUp),
    [{
      start: 1,
      end: 1,
    }]);
});

test('several items - single range', t => {
  t.deepEqual(arrayToRanges([1, 2, 3], countingUp),
    [{
      start: 1,
      end: 3,
    }]);
});

test('several items without repetition or singles', t => {
  t.deepEqual(arrayToRanges([1, 2, 3, 6, 7, 8], countingUp),
    [{
      start: 1,
      end: 3,
    }, {
      start: 6,
      end: 8,
    }]);
});

test('several items with repetition and singles', t => {
  t.deepEqual(arrayToRanges([1, 2, 2, 2, 3, 3, 5, 7, 8, 12], countingUp),
    [{
      start: 1,
      end: 3,
    }, {
      start: 5,
      end: 5,
    }, {
      start: 7,
      end: 8,
    }, {
      start: 12,
      end: 12,
    }]);
});

test('unordered data', t => {
  t.deepEqual(arrayToRanges([1, 3, 2, 2, 2, 3, 3, 5, 12, 7, 8], countingUp),
    [{
      start: 1,
      end: 1,
    }, {
      start: 3,
      end: 3,
    }, {
      start: 2,
      end: 3,
    }, {
      start: 5,
      end: 5,
    }, {
      start: 12,
      end: 12,
    }, {
      start: 7,
      end: 8,
    }]);
});

test('object values', t => {
  const objectCountDown = (current, next) => current.a - next.a === 0 || current.a - next.a === 1;

  t.deepEqual(arrayToRanges([
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
    }]);
});
