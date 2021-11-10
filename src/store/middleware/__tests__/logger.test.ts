import {
  configureStore,
  combineReducers,
  createReducer,
} from '@reduxjs/toolkit';
import logger from '../logger';

const store = (enabled: boolean) =>
  configureStore({
    reducer: combineReducers({
      data: createReducer({}, {}),
    }),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(logger({ enabled })),
  });

describe('Middleware -> Logger', () => {
  it('should log when the action be dispatched (logger enabled)', async () => {
    console.log = jest.fn();
    const action = { type: 'test' };

    await store(true).dispatch(action);

    expect(console.log).toHaveBeenCalledWith('Action called: ', action);
  });

  it('should not log when the action be dispatched (logger disabled)', async () => {
    console.log = jest.fn();
    const action = { type: 'test' };

    await store(false).dispatch(action);

    expect(console.log).not.toHaveBeenCalledWith('Action called: ', action);
  });
});
