import { Configured, Controller, Get, GetCollection, HttpRequest, HttpResponse, Post } from 'rosmarin.ts'
import { GetSingleBook } from './states/get-book'
import { GetAdminBook } from './states/get-admin-book'
import { GetBookCollection } from './states/get-book-collection'
import { PostBook } from './states/post-book'
import { bookViewSchema } from './views/book-view'
import { adminBookViewSchema } from './views/book-admin-view'
import { createBookViewSchema } from './views/create-book-view'
import { bookCollectionViewSchema } from './views/book-collection-view'


@Controller('/books')
export class BookController {
    
    @Post<PostBook>({
        consumes: 'application/vnd.book+json',
        schema: {
            body: createBookViewSchema
        }
    })
    public postBook(req: HttpRequest, res: HttpResponse): Configured<PostBook> {
        console.log(req.body);
        
        return new PostBook().configure(req, res)
    }

    @Get<GetAdminBook>({
        produces: 'application/vnd.book-admin+json',
        viewConverter: adminBookViewSchema
    })
    public getAdminBook(req: HttpRequest, res: HttpResponse): Configured<GetAdminBook> {
        return new GetAdminBook().configure(req, res)
    }
    
    @Get<GetSingleBook>({
        produces: 'application/vnd.book+json',
        viewConverter: bookViewSchema
    })
    public getSingleBook(req: HttpRequest, res: HttpResponse): Configured<GetSingleBook> {
        return new GetSingleBook().configure(req, res)
    }

    @GetCollection<GetBookCollection>({
        produces: 'application/vnd.book+json',
        viewConverter: bookCollectionViewSchema,
      })
      public getBooks(req: HttpRequest, res: HttpResponse): Configured<GetBookCollection> {
        return new GetBookCollection().configure(req, res)
      }
}