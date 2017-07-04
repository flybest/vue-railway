import axios from 'axios'

const apiMethods = {
  methods: {
    // webQuery: function (url, params, onSuccess, onError, retryTimes) {
    //   var success = arguments[2] ? arguments[2] : function () {}
    //   var error = arguments[3] ? arguments[3] : function () {}
    //   var retry = arguments[4] ? arguments[4] : 3
    //   var request = window.jQuery.ajax(url, {
    //     data: params,
    //     dataType: 'json',
    //     type: 'post',
    //     timeout: 10000,
    //     success: function (data) {
    //       if (data.err === 'ok') {
    //         onSuccess(data)
    //       } else {
    //         onError(data.code)
    //       }
    //     },
    //     error: function (xhr, type, errorThrown) {
    //       retry--
    //       if (retry > 0) return this.webQuery(url, params, success, error, retry)
    //       onError('FAILED_NETWORK')
    //     }
    //   })
    //   return request
    // },
    // webQueryJson: function (url, params, onSuccess, onError, retryTimes) {
    //   var success = arguments[2] ? arguments[2] : function () {}
    //   var error = arguments[3] ? arguments[3] : function () {}
    //   var retry = arguments[4] ? arguments[4] : 3
    //   var request = window.jQuery.ajax(url, {
    //     data: params,
    //     dataType: 'json',
    //     type: 'post',
    //     timeout: 3000,
    //     success: function (data) {
    //       if (data !== null && data !== '') {
    //         onSuccess(data)
    //       } else {
    //         onError('NO_DATA')
    //       }
    //     },
    //     error: function (xhr, type, errorThrown) {
    //       retry--
    //       if (retry > 0) return this.webQueryJson(url, params, success, error, retry)
    //       onError('FAILED_NETWORK')
    //     }
    //   })
    //   return request
    // },
    apiGet (url, data) {
      console.log(url,data)
      return new Promise((resolve, reject) => {
        axios.get(url, data).then((response) => {
          resolve(response.data)
        }).catch((response) => {
          reject(response)
        })
      })
    },
    apiPost (url, data) {
      var params = new URLSearchParams();
      for(var obj in data){
        params.append(obj, data[obj]);
      }
      return new Promise((resolve, reject) => {
        axios.post(url, params).then((response) => {
          resolve(response.data)
        }).catch((response) => {
          reject(response)
        })
      })
    },
    handelResponse (res, cb, errCb) {
      if (res.err === 'ok') {
        cb(res)
      } else {
        if (typeof errCb === 'function') {
          errCb(res.code)
        }
      }
    },
    handelError (err, type){
      var errMessage=""
      if(type=='data'){
        errMessage='数据异常: ' + (err?err:'请刷新重试')
      }else if(type=='network'){
        errMessage='网络异常: ' + (err?err.message:'请刷新重试')
      }
      return errMessage
    }
  }
}

export default apiMethods
