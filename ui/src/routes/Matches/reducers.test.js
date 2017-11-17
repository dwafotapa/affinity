import matches from './reducers.js';
import { REQUEST_MATCHES, RECEIVE_MATCHES } from './actions';

describe('Matches/reducers.js', () => {
  it('returns state if action is unknown', () => {
    const state = {
      isFetching: false,
      hasFetchFailed: false,
      items: [
        {
          display_name: "Caroline"
        },
        {
          display_name: "Sarah"
        }
      ]
    }

    const nextState = matches(state, { type: 'UNKNOWN_ACTION' });

    expect(nextState).toEqual(state);
  });
});