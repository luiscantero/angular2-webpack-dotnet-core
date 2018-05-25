import { Author } from '../author.model';
import { IAppState } from './IAppState';
import { ADD_ITEM, REMOVE_ITEM, REMOVE_ALL_ITEMS } from './actions';

export const INITIAL_STATE: IAppState = {
    authors: [
        { name: 'Bill', age: 20 },
        { name: 'Steve', age: 21 },
        { name: 'R.R.', age: 65 },
    ],
    lastUpdate: new Date(),
};

export function reducer(state: IAppState = INITIAL_STATE, action: any): IAppState {
    switch (action.type) {
        case ADD_ITEM:
            // Copy current state.
            var newState = Object.assign({}, state);

            // Add new item.
            newState = Object.assign(newState, {
                authors: state.authors.concat(Object.assign({}, action.author)),
            });

            // Update date.
            newState.lastUpdate = new Date();

            return newState;

        case REMOVE_ITEM:
            // Remove item.
            return Object.assign({}, state, {
                authors: state.authors.filter(a => a.name !== action.name),
                lastUpdate: new Date(),
            });

        case REMOVE_ALL_ITEMS:
            // Remove all items, keep other properties.
            return Object.assign({}, state, {
                authors: [],
                lastUpdate: new Date(),
            });
    }

    return state; // No changes.
}