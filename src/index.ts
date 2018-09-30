export {
  arrayToRanges,
  EndRangePredicate,
  Range,
};

interface Range<T> {
  start: T;
  end: T;
}

type EndRangePredicate<T> = (current: T, next: T) => boolean;

function arrayToRanges<T>(values: Array<T>, predicate: EndRangePredicate<T>): Array<Range<T>> {
  if (values.length === 0) {
    throw new Error('Empty input');
  }

  if (values.length === 1) {
    return [{
      start: values[0],
      end: values[0],
    }];
  }

  const result: Array<Range<T>> = [];
  let rangeStartIndex;
  let rangeEndIndex;
  let currIndex = 0;

  while (currIndex < values.length) {
    rangeStartIndex = currIndex;
    rangeEndIndex = getRangeEnd(values, currIndex, predicate);

    result.push({
      start: values[rangeStartIndex],
      end: values[rangeEndIndex],
    });

    currIndex = rangeEndIndex + 1;
  }

  return result;
}

function getRangeEnd<T>(values: Array<T>, currIndex: number, predicate: EndRangePredicate<T>): number {
  while (currIndex < values.length) {
    if (currIndex === values.length - 1 || !predicate(values[currIndex], values[currIndex + 1])) {
      return currIndex;
    }
    currIndex += 1;
  }

  throw new Error(`Unable to find end of range with arguments ${arguments}`);
}
