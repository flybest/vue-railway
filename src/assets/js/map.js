class Map{
    constructor(el){
      this.leaflet = window.L
      this.markerDic = {}
      this.selectMarkerCB = function(id){}
      this.Map = this.leaflet.map(el, {
            attributionControl: false
        }).setView([23.241346, 115.762939], 8)
      this.layerControl = this.leaflet.control.layers()
      this.layerControl.addTo(this.Map)
      this._addBaseLayers()
    }

    _addBaseLayers(){
      var gdBase = this.leaflet.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            maxZoom: 18,
            subdomains: '1234'
        })

        //Esri 地图
        var esriBase = this.leaflet.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18
        })

        var esriTerrainBase = this.leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 9
        })

        var esriTerrainMark = this.leaflet.tileLayer('http://t5.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}', {
            maxZoom: 9
        })

        //天地图地图 行政区和标记分为两层
        var tdtBase = this.leaflet.tileLayer('http://t0.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}', {
            maxZoom: 18
        })

        var tdtMark = this.leaflet.tileLayer('http://t5.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}', {
            maxZoom: 18
        })

        //Mapbox地图
        var mapboxBase = this.leaflet.tileLayer('https://api.mapbox.com/styles/v1/flybest/cis015ja50056guni20rynfgv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmx5YmVzdCIsImEiOiJ5dk94Y21nIn0.9LN4bbJvL7FHlE4Iuz3WCQ', {
            //var mapboxBase = this.leaflet.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i875mjb7'
        })

        // var googleTerrain = L.tileCrazyLayer('http://59.56.174.87:10002/Files/MapFile/Google/DiXing/Mercator/{xyz}.jpg', {
        //     maxZoom: 14
        // })

        var tdtGroup = this.leaflet.layerGroup([tdtBase, tdtMark])
        tdtGroup.addTo(this.Map)

        var esriTerrainGroup = this.leaflet.layerGroup([esriTerrainBase, esriTerrainMark])

        this.layerControl.addBaseLayer(tdtGroup, "天地图地图")
        // this.layerControl.addBaseLayer(googleTerrain, "谷歌地形地图")
        this.layerControl.addBaseLayer(gdBase, "高德地图")
        this.layerControl.addBaseLayer(esriBase, "Esri地图")
        this.layerControl.addBaseLayer(esriTerrainGroup, "Esri地形地图")
        this.layerControl.addBaseLayer(mapboxBase, "MapBox地图")
    }


    selectMarker(id){
      var theMarker = this.markerDic[id]
      if(theMarker == undefined || theMarker == null)
          return

      this.Map.setView(theMarker.getLatLng(),9,{animation:true})
      theMarker.openPopup()
    }

    updateRailway(data){
      var railwayBack=this.leaflet.geoJson(data, {
        style: function (feature) {
            return {
              color: '#fff',
              weight:5,
              lineCap:'square'
            }
        }
      }).bindPopup(function (layer) {
        //return layer.feature.properties.description
        return "高铁深厦线"
      })

      var railWayFront=this.leaflet.geoJson(data, {
        style: function (feature) {
          return {
            color: '#000',
            weight:5,
            dashArray:'15',
            dashOffset:'15',
            lineCap:'square'
          }
        }
      }).bindPopup(function (layer) {
        //return layer.feature.properties.description
        return "高铁深厦线"
      })

      var railwayGroup = this.leaflet.layerGroup([railwayBack,railWayFront])
      railwayGroup.addTo(this.Map)
      this.layerControl.addOverlay(railwayGroup,'高铁深厦线')
    }

    updateStation(data){
      this.markerDic = {}
      var markers=[]
      var that=this
      data.map(function (value, index) {
        var myIcon = that.leaflet.icon({iconUrl:"static/img/"+value.statue+".gif", iconSize: [12, 12]})
        var marker = that.leaflet.marker([value.lat, value.lon],{icon:myIcon,id:value.id,name:value.name}).bindPopup(value.name)
        that.markerDic[value.id]=marker
        markers.push(marker)
        marker.on('click',function(e){
          if(typeof that.selectMarkerCB === 'function'){
            that.selectMarkerCB(e.target.options.id)
          }
        })
      })

      if (this.markerGroup) {
        this.Map.removeLayer(this.markerGroup)
        this.layerControl.removeLayer(this.markerGroup)
      }
      this.markerGroup = this.leaflet.featureGroup(markers)
      this.Map.addLayer(this.markerGroup)
      this.layerControl.addOverlay(this.markerGroup, '铁路观测站')
    }

    updateWindField(data){
      // var mapCarousel=this.leaflet.mapCarousel(msg.data,'显示风场','<img src="static/img/WFLegend.png" style="margin: 0 autodisplay: block">')
      // mapCarousel.addTo(this.map)
    }

}

export default Map
