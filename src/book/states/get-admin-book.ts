import { AbstractGetState, SingleModelDatabaseResult, State } from 'rosmarin.ts'
import { Book } from '../book.model'
import { BookRepository } from '../book.repository'

@State()
export class GetAdminBook extends AbstractGetState<Book> {
    protected id: string

    constructor(private readonly repo?: BookRepository) {
        super()
    }

    public configureState(): void {
        this.activateApiKeyCheck()
    }

    protected async loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>> {
        console.log(this.id)
        
        return this.repo.readById(this.id)
    }
    
    protected defineTransitionLinks(): void | Promise<void> {
        this.addLink('/books', 'getBooks', 'application/vnd.book-admin+json')
        this.addLink('/books/:id', 'putBooks', 'application/vnd.book+json', [this.id])
        this.addLink('/books/:id', 'deleteBooks', 'application/vnd.book+json', [this.id])
    }

    protected extractFromRequest(): void {
        super.extractFromRequest()

        this.id = this.extractFromParams('id')
    }
}