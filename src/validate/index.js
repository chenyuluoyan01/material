/*验证手机号*/
export function isPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error('手机号不能为空'));
    } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error('请输入正确的手机号'));
        }
    }
}
/*验证统一信用代码*/
export function isCreditCode(rule, value, callback) {
    if (!value) {
        return callback(new Error('统一信用代码不能为空'));
    } else {
        const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error('请输入正确的统一信用代码'));
        }
    }
}