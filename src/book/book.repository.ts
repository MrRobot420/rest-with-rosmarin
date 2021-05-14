import { Book } from './book.model'
import { nanoid } from 'nanoid'
import { LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync.js'
import lowdb from 'lowdb/lib/main'
import { Logger } from 'pino'
import { container, singleton } from 'tsyringe'
import constants from 'rosmarin.ts/constants'
import { NoContentDatabaseResult } from 'rosmarin.ts'

export interface BookInDatabase {
  id: string

  lastModifiedAt: number

  title: string

  description: string
}

interface JsonDB {
  books: BookInDatabase[]
}

const bookInDbToBook = (bookInDb: BookInDatabase): Book => {
  const book = new Book()

  book.id = bookInDb.id
  book.description = bookInDb.description
  book.title = bookInDb.title
  book.lastModifiedAt = bookInDb.lastModifiedAt

  return book
}

@singleton()
export class BookRepository {
  private readonly db: LowdbSync<JsonDB>
  private readonly logger: Logger

  constructor() {
    const adapter = new FileSync<JsonDB>('db.json')
    this.db = lowdb(adapter)
    this.logger = container
      .resolve<Logger>(constants.LOGGER)
      .child({ context: this.constructor.name })
  }

  private generateId(): string {
    return nanoid(10)
  }

  private page<T>(array: T[], offset: number, size: number): T[] {
    return array.slice(offset, offset + size)
  }

  public async create(book: Book): Promise<NoContentDatabaseResult> {
    book.id = this.generateId()
    this.db
      .get('books')
      .push({
        id: book.id,
        title: book.title,
        lastModifiedAt: book.lastModifiedAt,
        description: book.description,
      })
      .write()

    this.logger.debug(`Created Book with ID ${book.id}.`)
    return new NoContentDatabaseResult()
  }

  public async readById(id: string): Promise<Book | undefined> {
    const bookInDb: BookInDatabase | undefined = this.db
      .get('books')
      .find((book: BookInDatabase) => book.id === id)
      .value()

    if (typeof bookInDb === 'undefined') return undefined

    return bookInDbToBook(bookInDb)
  }

  public async readAll(
    title: string,
    offset: number,
    size: number
  ): Promise<{ results: Book[]; totalCount: number }> {
    const books: BookInDatabase[] = this.db
      .get('books')
      .filter((book: BookInDatabase) => book.title.includes(title))
      .sortBy('lastModifiedAt')
      .value()

    const totalCount = books.length

    return {
      totalCount,
      results: this.page(books, offset, size).map<Book>(bookInDbToBook),
    }
  }

  public async deleteById(id: string): Promise<void> {
    this.db.get('books').remove({ id }).write()

    this.logger.debug(`Deleted Book with ID ${id}.`)
  }

  public async update(book: Book): Promise<void> {
    this.db.get('books').find({ id: book.id }).assign({
      title: book.title,
      lastModifiedAt: book.lastModifiedAt,
      description: book.description,
    })

    this.logger.debug(`Updated Book with ID ${book.id}.`)
  }
}
