import { AbstractGetCollectionStateWithOffsetSizePaging, CollectionModelDatabaseResult, State } from 'rosmarin.ts'
import { Book } from '../book.model'
import { BookRepository } from '../book.repository'

@State()
export class GetBookCollection extends AbstractGetCollectionStateWithOffsetSizePaging<Book> {
    protected title: string
    protected offset: number
    protected size: number
    
    constructor(private readonly repo?: BookRepository) {
        super()
    }

    protected async loadModelsFromDatabase(): Promise<CollectionModelDatabaseResult<Book>> {
        console.log(this.title)
        console.log(this.offset)
        console.log(this.size)
        
        return this.repo.readAll(this.title, this.offset, this.size)
    }
    
    protected defineTransitionLinks(): void | Promise<void> {
        this.addLink('/books', 'createNewBook', 'application/vnd.book+json')
    }

    protected extractFromRequest(): void {
        super.extractFromRequest()

        this.title = this.extractFromQuery('title')
        this.offset = parseInt(this.extractFromQuery('offset'))
        this.size = parseInt(this.extractFromQuery('size'))
    }
}