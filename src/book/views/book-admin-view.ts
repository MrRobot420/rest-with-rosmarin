import { AbstractViewModel, buildViewConverter, Link } from 'rosmarin.ts'
import { Book } from '../book.model'

export class AdminBookView extends AbstractViewModel {
    id: string
    title: string
    description: string
    self: Link
}

export const adminBookViewSchema = buildViewConverter(Book, AdminBookView)