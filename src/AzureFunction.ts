import { IHttpContext, IFunctionRequest, HttpStatusCodes, IFunctionResponse, Logger } from './index'

export abstract class AzureFunction {

    public contentType: string = 'application/json'

    public index (context: IHttpContext, req: IFunctionRequest) {
        Logger.prepareLogger(context)
        this.handler(req).then((success: any) => {
            context.done(null, {
                headers: {
                    'content-type': this.contentType
                },
                body: success
            })
        }, (reject: Error) => {
            context.done({
                status: HttpStatusCodes.BadRequest,
                headers: {
                    'content-type': 'plain/text'
                },
                body: reject.toString()
            })
        })
    }

    abstract async handler (req: IFunctionRequest): Promise<any>
}
