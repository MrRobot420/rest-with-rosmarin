import { AbstractViewModel, buildViewConverter, collectionView, viewProp } from 'rosmarin.ts'
import { Book } from '../book.model'

@collectionView()
export class BookCollectionView extends AbstractViewModel {
    @viewProp()
    title: string
}

export const bookCollectionViewSchema = buildViewConverter(Book, BookCollectionView)