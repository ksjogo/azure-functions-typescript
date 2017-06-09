import { IHttpContext, IFunctionRequest, HttpStatusCodes, IFunctionResponse } from './index'
import Logger from './Logger'

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
        }, (reject: any) => {
            context.done(null, {
                status: HttpStatusCodes.BadRequest,
                body: reject
            })
        })
    }

    abstract async handler (req: IFunctionRequest): Promise<any>
}
