import { Author } from '../author.model'

export interface IAppState {
    authors: Author[],
    lastUpdate: Date,
}
