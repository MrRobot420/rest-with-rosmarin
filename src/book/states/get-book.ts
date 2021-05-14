import { AbstractGetState, SingleModelDatabaseResult, State } from 'rosmarin.ts'
import { Book } from '../book.model'
import { BookRepository } from '../book.repository'

@State()
export class GetSingleBook extends AbstractGetState<Book> {
    protected id: string
    
    constructor(private readonly repo?: BookRepository) {
        super()
    }

    protected async loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>> {
        console.log(this.id)
        
        return this.repo.readById(this.id)
    }
    
    protected defineTransitionLinks(): void | Promise<void> {
        this.addLink('/books', 'getBooks', 'application/vnd.book+json')
    }

    protected extractFromRequest(): void {
        super.extractFromRequest()

        this.id = this.extractFromParams('id')
    }
}