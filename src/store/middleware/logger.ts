import { Middleware } from 'redux';
import { RootState } from '../configureStore';

interface Params {
  enabled: boolean;
}

const logger =
  ({ enabled }: Params): Middleware<{}, RootState> =>
  store =>
  next =>
  action => {
    if (enabled) {
      console.log('Action called: ', action);
    }
    next(action);
  };

export default logger;
