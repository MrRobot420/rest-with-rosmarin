import { AbstractPostState, NoContentDatabaseResult, State } from 'rosmarin.ts'
import { Book } from '../book.model'
import { BookRepository } from '../book.repository'
import { CreateBookView } from '../views/create-book-view'

@State()
export class PostBook extends AbstractPostState<Book, CreateBookView> {
    protected id: string
    protected lastModifiedAt: number
    protected title: string
    protected description: string

    constructor(private readonly repo?: BookRepository) {
        super()
    }

    public configureState(): void {
        this.activateApiKeyCheck()
    }

    protected createDatabaseModel(): Book {
        return new Book()
    }

    protected async createModelInDatabase(): Promise<NoContentDatabaseResult> {
        return this.repo.create(this.modelToStoreInDatabase)
    }
    
    protected defineTransitionLinks(): void | Promise<void> {
        this.addLink('/books', 'getBooks', 'application/vnd.book+json')
    }

    protected extractFromRequest(): void {
        super.extractFromRequest()

        this.id = this.extractFromParams('id')
        this.lastModifiedAt = parseInt(this.extractFromParams('lastModifiedAt'))
        this.title = this.extractFromParams('title')
        this.description = this.extractFromParams('description')
    }
}