function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i], i, collection);
        }
    } else if (collection && typeof collection === 'object') {
        const keys = Object.keys(collection);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            callback(collection[key], key, collection);
        }
    }
    return collection;
}

function myMap(collection, callback) {
    const result = [];
    myEach(collection, (item, index, collection) => {
        result.push(callback(item, index, collection));
    });
    return result;
}

function myReduce(collection, callback, initialValue) {
  let accumulator = initialValue;
  let hasAccumulator = initialValue !== undefined;

  myEach(collection, (item, index, collection) => {
    if (!hasAccumulator) {
      accumulator = item;
      hasAccumulator = true;
    } else {
      accumulator = callback(accumulator, item, index, collection);
    }
  });

  return accumulator;
}

function myFind(collection, callback) {
  let result;
  let found = false;

  myEach(collection, (item, index, collection) => {
    if (found) return; 

    if (callback(item, index, collection)) {
      result = item;
      found = true;
    }
  });

  return result;
}

function myFilter(collection, callback) {
  const result = [];
  myEach(collection, (item, index, collection) => {
    if (callback(item, index, collection)) {
      result.push(item);
    }
  });
  return result;
}

function mySize (collection) {
  let size = 0;
  myEach(collection, () => {
    size++;
  });
  return size;
}

function myFirst(collection, n) {
  if (n === undefined) {
    let firstItem;
    myEach(collection, (item) => {
      if (firstItem === undefined) {
        firstItem = item;
      }
    });
    return firstItem;
  }

  let result = [];
  let count = 0;
  myEach(collection, (item) => {
    if (count < n) {
      result.push(item);
      count++;
    }
  });
  return result;
}

function myLast(collection, n) {
  let items = [];
  myEach(collection, (item) => {
    items.push(item);
  });
  if (n === undefined) {
    return items[items.length - 1];
  }
  return items.slice(Math.max(0, items.length - n));
}

function myKeys(collection){
  const keys = [];
  myEach(collection, (item, key) => {
    keys.push(key);
  });
  return keys;
}

function myValues(collection){
    let keys = [];

    for (let key in collection) {
        if (collection.hasOwnProperty(key)) {
            keys.push(collection[key]);
        }
    }
    return keys;
}

function mySortBy(collection, callback) {
  const sorted = collection.slice();
  
  sorted.sort((a, b) => {
    const valueA = callback(a);
    const valueB = callback(b);

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  return sorted;
}

