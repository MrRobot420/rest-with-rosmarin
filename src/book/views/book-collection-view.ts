import { AbstractViewModel, buildViewConverter } from 'rosmarin.ts'
import { Book } from '../book.model'

export class BookCollectionView extends AbstractViewModel {
    title: string
}

export const bookCollectionViewSchema = buildViewConverter(Book, BookCollectionView)