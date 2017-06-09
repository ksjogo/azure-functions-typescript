export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FATAL"] = 1] = "FATAL";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["INFO"] = 4] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 5] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 6] = "TRACE";
})(LogLevel || (LogLevel = {}));
export class Logger {
    constructor() {
        this.level = 2;
        this.context = null;
    }
    prepareLogger(c) {
        this.context = c;
        this.level = process.env.LOGGER_LEVEL;
    }
    warning(...things) {
        if (this.context && LogLevel.WARN <= this.level)
            this.context.log.apply(this.context, things);
    }
    error(...things) {
        if (this.context && LogLevel.ERROR <= this.level)
            this.context.log.apply(this.context, things);
    }
    log(l, ...things) {
        if (this.context && l <= this.level)
            this.context.log.apply(this.context, things);
    }
}
export default new Logger();
