import { fold  } from 'fp-ts/lib/Array';

const numberArray = [1,2,3,4,5,6];

const sumArray = fold(numberArray, 0, (head, tail) => head + sumArray(tail));

const reduceArray = numberArray.reduce((prev, curr) => prev + curr, 0);

console.log('fold' , sumArray(numberArray) )
console.log('reduce', reduceArray)