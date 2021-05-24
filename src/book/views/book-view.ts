import { AbstractViewModel, buildViewConverter, Link } from 'rosmarin.ts'
import { Book } from '../book.model'

export class BookView extends AbstractViewModel {
    id: string
    title: string
    self: Link
}

export const bookViewSchema = buildViewConverter(Book, BookView)