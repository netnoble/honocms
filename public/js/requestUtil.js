// requestUtil.js

(function(global, $, layer) {
    var exports = {};

    exports.apiPost = function(url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success: function(res) {
                if (res.code === 200) {
                    if(successCallback && typeof(successCallback) === "function") {
                        successCallback(res);
                    }
                } else {
                    layer.msg(res.message || '操作失败', {icon: 2});
                    if(errorCallback && typeof(errorCallback) === "function") {
                        errorCallback(res);
                    }
                }
            },
            error: function() {
                layer.alert('请求失败，请稍后再试', {
                    title: '错误'
                });
                if(errorCallback && typeof(errorCallback) === "function") {
                    errorCallback();
                }
            }
        });
    };

    exports.apiGet = function(url, params, successCallback, errorCallback) {
        let requestUrl = url + (params ? '?' + $.param(params) : '');

        $.ajax({
            url: requestUrl,
            type: 'GET',
            success: function(res) {
                if (res.code === 200) {
                    if(successCallback && typeof(successCallback) === "function") {
                        successCallback(res);
                    }
                } else {
                    layer.msg(res.message || '获取数据失败', {icon: 2});
                    if(errorCallback && typeof(errorCallback) === "function") {
                        errorCallback(res);
                    }
                }
            },
            error: function() {
                layer.alert('请求失败，请稍后再试', {
                    title: '错误'
                });
                if(errorCallback && typeof(errorCallback) === "function") {
                    errorCallback();
                }
            }
        });
    };

    // 暴露接口到全局对象
    global.RequestUtil = exports;

})(this, layui.jquery, layui.layer);