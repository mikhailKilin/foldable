import { Option, some } from 'fp-ts/lib/Option';

const optNumber = some(1);

const optFold = optNumber.fold(false, _ => true);

console.log('option fold', optFold)