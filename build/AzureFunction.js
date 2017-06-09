import Logger from './Logger';
export class AzureFunction {
    constructor() {
        this.contentType = 'application/json';
    }
    index(context, req) {
        Logger.prepareLogger(context);
        this.handler(req).then((success) => {
            context.done(null, {
                headers: {
                    'content-type': this.contentType
                },
                body: success
            });
        }, (reject) => {
            context.done(null, {
                status: 400,
                headers: {
                    'content-type': 'plain/text'
                },
                body: reject.toString()
            });
        });
    }
}
