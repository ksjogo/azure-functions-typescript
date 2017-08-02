import { IHttpContext } from './index'

enum LogLevel {
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    TRACE = 6
}

class Logger {
    public level: number = 2
    public context: IHttpContext = null

    public prepareLogger (c: IHttpContext) {
        this.context = c
        this.level = +process.env.LOGGER_LEVEL as LogLevel
    }

    public warning (...things: any[]) {
        if (this.context && LogLevel.WARN <= this.level)
            this.context.log.apply(this.context, things)
    }

    public error (...things: any[]) {
        if (this.context && LogLevel.ERROR <= this.level)
            this.context.log.apply(this.context, things)
    }

    public log (l: LogLevel, ...things: any[]) {
        if (this.context && l <= this.level)
            this.context.log.apply(this.context, things)
    }
}

export default new Logger()
