import { Configured, Controller, HttpRequest, HttpResponse, Post } from 'rosmarin.ts'
import { PostBook } from './states/post-book'
import { createBookViewSchema } from './views/create-book-view'


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
}