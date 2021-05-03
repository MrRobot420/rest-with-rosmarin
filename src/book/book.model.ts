import { Link } from 'rosmarin.ts'

export class Book {
  public id: string

  public lastModifiedAt: number

  public title: string

  public description: string

  public self: Link
}
