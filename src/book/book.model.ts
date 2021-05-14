import { AbstractModel, link, Link, modelProp } from 'rosmarin.ts'

export class Book extends AbstractModel {
  @modelProp()
  public id: string

  @modelProp()
  public lastModifiedAt: number

  @modelProp()
  public title: string

  @modelProp()
  public description: string

  @link('/books/{id}', 'self', 'application/vnd.book+json')
  public self: Link
}
