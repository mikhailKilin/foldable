import { fold } from 'fp-ts/lib/Array';
import { foldMap } from 'fp-ts/lib/Foldable';
import { array } from 'fp-ts/lib/Array';
import { monoidSum } from 'fp-ts/lib/Monoid';
import { identity } from 'fp-ts/lib/function'
const arr = [1,2,3,4,5];

const sumArray = (arr: Array<number>): number => fold(arr, 0, (head, tail) => head + sumArray(tail));

const reduceArray = arr.reduce((prev, curr) => prev + curr, 0);

console.log('fold' , sumArray(arr) )
console.log('reduce', reduceArray)

function concatArrayWithItem <T>(acc: Array<T>, val: T): Array<T> {
    return acc.concat([val])
}

function toArray <T>(arr: Array<T>): Array<T> {
    return arr.reduce(concatArrayWithItem, []);
}

const fromArrayToString = <T>(arr: Array<T>) => {
    return `${arr.join(',')}`
}

const arrayToString = (acc: number, curr: number) => acc + curr;

console.log('identity', toArray(arr).reduce(arrayToString, 0), arr.reduce(arrayToString, 0))



































console.log('foldMap array sum', foldMap(array, monoidSum)(arr, identity))
