import {dispatch} from '../store';
import {setError} from '../store/slices/app-slice/app-slice';

export function handleError(errorMessage: string) {
  dispatch(setError(errorMessage));
}
