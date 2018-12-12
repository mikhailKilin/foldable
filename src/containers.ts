import { some } from 'fp-ts/lib/Option';
import { right, left, Either } from 'fp-ts/lib/Either';
import { success, pending, RemoteData }  from '@devexperts/remote-data-ts'
const optNumber = some(1);

const optFold = optNumber.fold(false, _ => true);
console.log('--1--')
console.log('option fold', optFold)
console.log('-----')

const successData: RemoteData<Error, string> = success('fp power');
const pendingData: RemoteData<Error, string> = pending;

//Зачем тянуть данные залифченные в remote data? Затем, чтобы сохранить нужный нам эффект (в данном случае информацию о том, в какой состоянии у нас данные)
//и решить, что с данными делать во всех кейсах в одном месте.
const successFold = successData.fold('initial', 'pending', () => 'failure', data => data);
const pendingFold = pendingData.fold('initial', 'pending', () => 'failure', data => data);
const successFoldL = successData.foldL(() => 'initial', () => 'pending', () => 'failure', data => data);

console.log('--2--')
console.log('success remote data fold', successFold);
console.log('pending remote data fold', pendingFold);
console.log('success remote data foldL', successFoldL);
console.log('-----')

const rightEither: Either<Error, number> = right(1);
const leftEither: Either<Error, number> = left(new Error('some error'));

const rightEitherFold = rightEither.fold(error => error.message, data => data.toString());
const leftEitherFold = leftEither.fold(error => error.message, data => data.toString());

console.log('--3--')
console.log('right either fold', rightEitherFold)
console.log('left either fold', leftEitherFold)
console.log('-----')