import {Request, Response} from "express";


export type BlogViewModelType = {
    id:	string
    name: string
    description: string
    websiteUrl:	string
}

export type PostViewModelType = {
    id:	string
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
}

export type BlogInputModelType = Omit<BlogViewModelType, 'id'>
export type PostInputModelType = Omit<PostViewModelType, 'id' | 'blogName'>

export type FieldErrorType = {
    message: string,
    field: string
}

export type ApiErrorResult = {
    errorsMessages: FieldErrorType[]
}


export type ParamsType = {id: string}
export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>