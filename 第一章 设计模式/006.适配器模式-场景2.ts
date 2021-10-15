/**
 * 将jQuery的$ajax 用适配器改为 axios
 */

/**
 * 原来的调用
 */
let url = ''
let formData = {}
$.ajax({
    type: "post",
    dataType: "json",
    url: url,
    data: formData,
    success: function (res) {},
    error: function (err) {}
});

/**
 * 重写成axios
 */
import $ from "jquery";
import axios from "axios";
$.ajax = function (options: any) {
    return axios({
        url: options.url,
        method: options.method
    }).then(options.success, options.error)
}


