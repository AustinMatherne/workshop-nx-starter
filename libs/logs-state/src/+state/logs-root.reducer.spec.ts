import { LogsRootLoaded } from './logs-root.actions';
import { logsRootReducer, initialState } from './logs-root.reducer';

describe('logsRootReducer', () => {
  it('should work', () => {
    const action: LogsRootLoaded = new LogsRootLoaded({});
    const actual = logsRootReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
