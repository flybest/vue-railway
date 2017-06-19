// UMD initialization to work with CommonJS, AMD and basic browser script include
(function (factory) {
    // var L;
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module === 'object' && typeof module.exports === "object") {
        // Node/CommonJS
        // L = require('leaflet');
        module.exports = factory(L);
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
}(function (L) {

    L.Playback = L.Playback || {};
    L.Playback.Util = L.Class.extend({
        statics: {
            toDate: function (time) {
                if (time.length >= 12) {
                    var yy = time.substring(0, 4);
                    var mm = time.substring(4, 6);
                    var dd = time.substring(6, 8);
                    var hh = time.substring(8, 10);
                    var ff = time.substring(10, 12);
                    return new Date(yy, parseInt(mm)-1, dd, hh, ff, "00");
                }
            },

            DateStr:function(datetime, format){
                format=format||'yyyy-MM-dd hh:mm:ss';
                var z = {
                    "M+": datetime.getMonth() + 1, //月份
                    "d+": datetime.getDate(), //日
                    "h+": datetime.getHours(), //小时
                    "m+": datetime.getMinutes(), //分
                    "s+": datetime.getSeconds(), //秒
                    "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
                    "S": datetime.getMilliseconds() //毫秒
                };

                if (/(y+)/.test(format)){
                    format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in z){
                    if (new RegExp("(" + k + ")").test(format)){
                        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (z[k]) : (("00" + z[k]).substr(("" + z[k]).length)));
                    }
                }
                return format;

                //return time.toLocaleDateString();
            },

            TimeStr: function (time) {
//                var d = new Date(time);
//                var h = d.getHours();
//                var m = d.getMinutes();
//                var s = d.getSeconds();
//                var tms = time / 1000;
//                var dec = (tms - Math.floor(tms)).toFixed(2).slice(1);
//                var mer = 'AM';
//                if (h > 11) {
//                    h %= 12;
//                    mer = 'PM';
//                }
//                if (h === 0) h = 12;
//                if (m < 10) m = '0' + m;
//                if (s < 10) s = '0' + s;
//                return h + ':' + m + ':' + s + dec + ' ' + mer;
                return time.toLocaleTimeString();
            },
        }

    });


    L.Playback = L.Playback || {};
    L.Playback.Clock = L.Class.extend({

        initialize: function (tracksLayer, layerdata, callback, options) {
            this._callbacksArry = [];
            if (callback) this.addCallback(callback);
            L.setOptions(this, options);
            this._speed = this.options.speed;
            this._tickLen = this.options.tickLen;
            this._cursor = 0;
            this._transitionTime = this._tickLen / this._speed;
            this._tracksLayer = tracksLayer;
            this._layerdata = layerdata;
            this._maxIndex = layerdata.dataList.length - 1;
            this._control=null;
        },

        _tick: function (self) {
            if (++self._cursor > self._maxIndex) {
                //clearInterval(self._intervalID);
                //return;
                self._cursor = self.getStartCursor();
            }
            self._tracksLayer.setUrl(self._layerdata.dataList[self._cursor].picPath);
            self._callbacks(self._cursor);
        },

        _callbacks: function (cursor) {
            var arry = this._callbacksArry;
            for (var i = 0, len = arry.length; i < len; i++) {
                arry[i](this, this._control, cursor);
            }
        },

        addCallback: function (fn) {
            this._callbacksArry.push(fn);
        },

        start: function () {
            if (this._intervalID) return;
            this._intervalID = window.setInterval(
                this._tick,
                this._transitionTime,
                this);
        },

        stop: function () {
            if (!this._intervalID) return;
            clearInterval(this._intervalID);
            this._intervalID = null;
        },

        isPlaying: function () {
            return this._intervalID ? true : false;
        },

        getSpeed: function () {
            return this._speed;
        },

        setSpeed: function (speed) {
            this._speed = speed;
            this._transitionTime = this._tickLen / speed;
            if (this._intervalID) {
                this.stop();
                this.start();
            }
        },

        setCursor: function (index) {
            this._cursor = index > this._maxIndex ? this._maxIndex : index;
            this._tracksLayer.setUrl(this._layerdata.dataList[this._cursor].picPath);
            this._callbacks(this._cursor);
        },

        getCursor:function(){
            return this._cursor;
        },

        setControl:function(control){
            this._control=control;
        },

        getTime: function () {
            return L.Playback.Util.toDate(this._layerdata.dataList[this._cursor].picDt);
        },

        getStartTime: function () {
            return L.Playback.Util.toDate(this._layerdata.dataList[0].picDt);
        },

        getEndTime: function () {
            return L.Playback.Util.toDate(this._layerdata.dataList[this._maxIndex].picDt);
        },

        getStartCursor: function () {
            return 0;
        },

        getEndCursor: function () {
            return this._maxIndex;
        },

        getStep: function () {
            return 1;
        }

    });

    // Simply shows all of the track points as circles.
    // TODO: Associate circle color with the marker color.

    L.Playback = L.Playback || {};
    L.Playback = L.Playback.Clock.extend({
        statics: {
            Track: L.Playback.Track,
            Clock: L.Playback.Clock,
            Util: L.Playback.Util,
            TracksLayer: L.ImageOverlay,
        },

        options: {
            tickLen: 250,
            speed: 1,
            opacity: 0.9,
            tracksLayer: true
        },

        initialize: function (map, layerdata, callback, options) {
            L.setOptions(this, options);

            this._map = map;
            if (this.options.tracksLayer) {
                this._tracksLayer = new L.ImageOverlay(layerdata.dataList[0].picPath, layerdata.bound, this.options);
            }
            L.Playback.Clock.prototype.initialize.call(this, this._tracksLayer, layerdata, callback, this.options);

            this._map.addLayer(this._tracksLayer);
            this.hideLayer();
            var _islayerVisiable = false;
        },

        showLayer: function () {
            this._tracksLayer.setOpacity(this.options.opacity);
            this._islayerVisiable = true;
        },

        hideLayer: function () {
            this._tracksLayer.setOpacity(0);
            this._islayerVisiable = false;
        },

        islayerVisiable: function () {
            return this._islayerVisiable;
        }
    });

    L.Map.addInitHook(function () {
        if (this.options.playback) {
            this.playback = new L.Playback(this);
        }
    });

    L.Playback = L.Playback || {};
    L.Playback.Control = L.Control.extend({

        _html: //'         <p class="sectionlabel">叠加控制</p>'+
        '         <div class="btn-group sectionlabel" data-toggle="buttons">'+
        '             <label class="btn btn-default" id="datalabel">'+
        '                 <input type="checkbox" autocomplete="off"> '+
        '             </label>'+
        '         </div>'+
        //'         <p class="sectionlabel">播放控制</p>'+
        '         <div class="transport sectionlabel">'+
        '             <nav class="navbar navbar-default">'+
        '                 <div class="container-fluid">'+
        '                     <div class="navbar-header">'+
        '                         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">'+
        '                             <span class="sr-only">Toggle navigation</span>'+
        '                             <span class="icon-bar"></span>'+
        '                             <span class="icon-bar"></span>'+
        '                             <span class="icon-bar"></span>'+
        '                         </button>'+
        '                         <a class="navbar-brand" id="play-pause" ><i id="play-pause-icon" class="fa fa-play fa-lg"></i></a>'+
        '                     </div>'+
        '                     <div class="collapse navbar-collapse" id="navbar-collapse-1">'+
        '                         <ul class="nav navbar-nav">'+
        '                             <li>'+
        '                                 <div id="clock-btn" class="clock">'+
        '                                     <div id="cursor-date">yyyy年MM月dd日</div>'+
        '                                     <div id="cursor-time">HH:mm:ss</div>'+
        '                                 </div>'+
        '                             </li>'+
        '                         </ul>'+
        '                         <ul class="nav navbar-nav navbar-right">'+
        '                             <li>'+
        '                                  <div class="time-slider-container">'+
        '                                    <div id="time-slider"></div>'+
        '                                  </div>'+
        '                             </li>'+
        '                             <li> <a id="speed-btn" data-toggle="dropdown" href="#"><i class="fa fa-dashboard fa-lg"></i><br><span id="speed-icon-val" class="speed">1</span>x</a>'+
        '                                 <div class="speed-menu dropdown-menu" role="menu" aria-labelledby="speed-btn">'+
        '                                     <input id="speed-input" class="span1 speed" type="text" value="1">'+
        '                                     <div id="speed-slider"></div>'+
        '                                 </div>'+
        '                             </li>'+
        '                         </ul>'+
        '                     </div>'+
        '                 </div>'+
        '             </nav>'+
        '         </div>',

        initialize: function (playback, dataDescription) {
            this._playback = playback;
            playback.addCallback(this._clockCallback);
            this._dataDescription=dataDescription;
        },

        addTo: function (container) {
            var randname=Math.round(Math.random()*100000);
            this._control=$('<div id="playbackcontrol_'+randname.toString()+'" class="lp"></div>')
            this._control.append(this._html);
            this._control.find('#datalabel').append(this._dataDescription);
            this._container=container;
            $(this._container).append(this._control);

            this._control.find('.navbar-toggle').attr("data-target","#navbar-collapse-"+randname.toString());
            this._control.find('.collapse').attr("id","navbar-collapse-"+randname.toString());

            this._setup();

            // just an empty container
            // TODO: dont do this
            return L.DomUtil.create('div');
        },

        getControlBtn:function(){
            return this._control.find('#datalabel')[0];
        },

        _setup: function () {
            var self = this;
            var playback = this._playback;
            var control=this._control;
            this._playback.setControl(this._control);

            this._control.find('#datalabel').click(function(){
                if(!playback.islayerVisiable()) {
                    playback.showLayer();
                }else{
                    if(playback.isPlaying()){
                        self._controlPlayer();
                    }
                    playback.hideLayer();
                }
            });

            this._control.find('#play-pause').click(function () {
                if(playback.islayerVisiable()){
                    self._controlPlayer();
                }
            });

            var startTime = playback.getStartTime();
            this._control.find('#cursor-date').html(L.Playback.Util.DateStr(startTime,'yyyy-MM-dd'));
            this._control.find('#cursor-time').html(L.Playback.Util.DateStr(startTime,'hh:mm:ss'));
            this._control.find('#time-slider').slider({
                min: playback.getStartCursor(),
                max: playback.getEndCursor(),
                step: playback.getStep(),
                value: playback.getCursor(),
                slide: function (event, ui) {
                    playback.setCursor(ui.value);
                    control.find('#cursor-time').html(L.Playback.Util.DateStr(playback.getTime(),'yyyy-MM-dd'));
                    control.find('#cursor-date').html(L.Playback.Util.DateStr(playback.getTime(),'hh:mm:ss'));
                }
            });

            this._control.find('#speed-slider').slider({
                min: -9,
                max: 9,
                step: .1,
                value: self._speedToSliderVal(playback.getSpeed()),
                orientation: 'vertical',
                slide: function (event, ui) {
                    var speed = self._sliderValToSpeed(parseFloat(ui.value));
                    playback.setSpeed(speed);
                    control.find('.speed').html(speed).val(speed);
                }
            });

            this._control.find('#speed-input').on('keyup', function (e) {
                var speed = parseFloat(control.find('#speed-input').val());
                if (!speed) return;
                playback.setSpeed(speed);
                control.find('#speed-slider').slider('value', self._speedToSliderVal(speed));
                control.find('#speed-icon-val').html(speed);
                if (e.keyCode === 13) {
                    control.find('.speed-menu').dropdown('toggle');
                }
            });

            this._control.find('.dropdown-menu').on('click', function (e) {
                e.stopPropagation();
            });
        },

        _clockCallback: function (playback, control, cursor) {
            control.find('#cursor-date').html(L.Playback.Util.DateStr(playback.getTime(),'yyyy-MM-dd'));
            control.find('#cursor-time').html(L.Playback.Util.DateStr(playback.getTime(),'hh:mm:ss'));
            control.find('#time-slider').slider('value', cursor);
        },

        _speedToSliderVal: function (speed) {
            if (speed < 1) return -10 + speed * 10;
            return speed - 1;
        },

        _sliderValToSpeed: function (val) {
            if (val < 0) return parseFloat((1 + val / 10).toFixed(2));
            return val + 1;
        },

        _controlPlayer: function(){
            if (this._playback.isPlaying() === false) {
                this._playback.start();
                this._control.find('#play-pause-icon').removeClass('fa-play');
                this._control.find('#play-pause-icon').addClass('fa-pause');
            } else {
                this._playback.stop();
                this._control.find('#play-pause-icon').removeClass('fa-pause');
                this._control.find('#play-pause-icon').addClass('fa-play');
            }
        }
    });

    L.playback = function (map, layerdata, callback, options) {
        return new L.Playback(map, layerdata, callback, options);
    };

    return L.playback;

}));
