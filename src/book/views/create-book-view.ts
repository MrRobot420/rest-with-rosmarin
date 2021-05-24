import { AbstractViewModel, buildValidatorAndTransformer, viewProp } from 'rosmarin.ts'

export class CreateBookView extends AbstractViewModel {
    @viewProp({
        type: 'string'
    })
    id: string

    @viewProp({
        type: 'integer',
        minimum: 1
    })
    lastModifiedAt: number

    @viewProp({
        type: 'string'
    })
    title: string

    @viewProp({
        type: 'string',
        minLength: 5,
        maxLength: 500
    })
    description: string
}

export const createBookViewSchema = buildValidatorAndTransformer(CreateBookView)