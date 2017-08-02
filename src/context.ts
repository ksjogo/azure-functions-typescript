import { IFunctionResponse } from './http'

export interface IContext {
    invocationId: string
    bindingData: any
    bindings: any[]
    log (...text: any[]): void
    done (err ?: any, res?: IFunctionResponse): void
}
