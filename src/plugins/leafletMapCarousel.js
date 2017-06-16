/**
 * Created by zhangzt on 2016/10/19.
 */
(function (factory) {
    var L;
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module === 'object' && typeof module.exports === "object") {
        // Node/CommonJS
        L = require('leaflet');
        module.exports = factory(L);
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
}(function (L) {

    L.MapCarousel = L.Class.extend({
        initialize: function (data, description,legendContent) {
            this._playControl=new L.MapCarousel.PlayControl(data,description);
            this._legend=new L.MapCarousel.Legend(legendContent);
        },
        onAdd:function(map){
            this._playControl.addTo(map);
            this._legend.addTo(map);
        },
        onRemove:function(){
            this._playControl.remove();
            this._legend.remove();
        },
        addTo:function(map){
            this.onAdd(map);
        },
        remove:function(){
            this.onRemove();
        }
    });

    L.MapCarousel.PlayControl = L.Control.extend({
        _toggleMenuContent:function(ev){
            $(this._carouselContent).slideToggle();
            L.DomEvent.preventDefault(ev);
        },
        options: {
            position: 'topleft',
        },
        initialize: function(data, description){
            //L.Control.prototype.initialize.call(this, options);
            this._data=data;
            this._description=description;
        },
        onAdd:function(map){
            this._container=L.DomUtil.create('div','leaflet-carousel');
            this._container.innerHTML='<button type="button" class="btn btn-default carousel-item" data-toggle="button" aria-pressed="false" autocomplete="off"> 预报风场</button>';
            this._carouselItem=this._container.getElementsByTagName('button')[0];
            this._carouselContent=L.DomUtil.create('div', 'dropdown-menu carousel-content');

            this._container.appendChild(this._carouselItem);
            this._container.appendChild(this._carouselContent);

            L.DomEvent.disableClickPropagation(this._container);
            var playback = new L.Playback(map, this._data, null, null);
            var playbackcontrol = new L.Playback.Control(playback, this._description);
            playbackcontrol.addTo(this._carouselContent);

            L.DomEvent.on(this._carouselItem, 'click',this._toggleMenuContent,this);
            L.DomEvent.on(playbackcontrol.getControlBtn(), 'click', function(){
                map.fire('showlegend');
            });

            return this._container;
        },
        onRemove:function (map) {
            L.DomEvent.off(this._carouselItem, 'click',this._toggleMenuContent,this);
        }
    });

    L.MapCarousel.Legend = L.Control.extend({
        _toggleLegend:function(ev){
            $(this._container).toggleClass('active');
            L.DomEvent.preventDefault(ev);
        },
        options: {
            position: 'bottomleft'
        },
        initialize: function(content){
            //L.Control.prototype.initialize.call(this, options);
            this._content=content;
        },
        onAdd:function(map){
            this._container=L.DomUtil.create('div','leaflet-carousel-legend');
            this._container.innerHTML=this._content;
            L.DomEvent.disableClickPropagation(this._container);
            map.on('showlegend',this._toggleLegend,this);
            return this._container;
        },
        onRemove:function (map) {

        }
    });

    L.mapCarousel= function (data, description,legendContent) {
        return new L.MapCarousel(data, description,legendContent);
    }
}));