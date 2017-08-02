import { IHttpContext, IFunctionRequest, HttpStatusCodes, IFunctionResponse, Logger } from './index'

export abstract class AzureFunction {

    public contentType: string = 'application/json'

    public index (context: IHttpContext, req: IFunctionRequest) {
        Logger.prepareLogger(context)
        this.preHandler(req)
        this.handler(req).then((success: any) => {
            context.done(null, {
                headers: {
                    'content-type': this.contentType
                },
                body: success
            })
        }).catch((reject: Error) => {
            context.done(null, {
                status: HttpStatusCodes.BadRequest,
                headers: {
                    'content-type': 'plain/text'
                },
                body: reject.toString()
            })
        })
    }

    abstract preHandler (req: IFunctionRequest): void

    abstract async handler (req: IFunctionRequest): Promise<any>
}
