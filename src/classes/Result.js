export class Result {
    _status = false;
    _message = '';
    _data = null;
    _code = 200;
    constructor(data, status = true, message = '', code = 200) {
        this._message = message;
        this._status = status;
        this._data = data;
        this._code = code;
    }

    setStatus(status) {
        this._status = status;
    }

    setCode(code) {
        this._code = code;
    }

    setData(data) {
        this._data = data;
    }

    setMessage(message) {
        this._message = message;
    }

    toJson() {
        return {
            status: this._status,
            message: this._message,
            data: this._data,
            code: this._code
        }
    }
}