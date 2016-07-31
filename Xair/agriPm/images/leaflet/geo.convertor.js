(function () {

    function LAT_OFFSET_0(x, y) { return -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x)); }
    function LAT_OFFSET_1(x) { return (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0; }
    function LAT_OFFSET_2(y) { return (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0; }
    function LAT_OFFSET_3(y) { return (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0; }

    function LON_OFFSET_0(x, y) { return 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x)); }
    function LON_OFFSET_1(x) { return (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0; }
    function LON_OFFSET_2(x) { return (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0; }
    function LON_OFFSET_3(x) { return (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0; }

    var RANGE_LON_MAX = 137.8347;
    var RANGE_LON_MIN = 72.004;
    var RANGE_LAT_MAX = 55.8271;
    var RANGE_LAT_MIN = 0.8293;
    var jzA = 6378245.0; //r of Earth
    var jzEE = 0.00669342162296594323;


    function transformLat(x, y)//:(double)x bdLon:(double)y
    {
        var ret = LAT_OFFSET_0(x, y);
        ret += LAT_OFFSET_1(x);
        ret += LAT_OFFSET_2(y);
        ret += LAT_OFFSET_3(y);
        return ret;
    }

    function transformLon(x, y)//:(double)x bdLon:(double)y
    {
        var ret = LON_OFFSET_0(x, y);
        ret += LON_OFFSET_1(x);
        ret += LON_OFFSET_2(x);
        ret += LON_OFFSET_3(x);
        return ret;
    }

    function outOfChina(lat, lon)//:(double)lat bdLon:(double)lon
    {
        if (lon < RANGE_LON_MIN || lon > RANGE_LON_MAX)
            return true;
        if (lat < RANGE_LAT_MIN || lat > RANGE_LAT_MAX)
            return true;
        return false;
    }

    function gcj02Encrypt(ggLat, ggLon)//:(double)ggLat bdLon:(double)ggLon
    {
        if (outOfChina(ggLat, ggLon)) {
            return { lat: ggLat, lng: ggLon };
        }

        var dLat = transformLat(ggLon - 105.0, ggLat - 35.0);
        var dLon = transformLon(ggLon - 105.0, ggLat - 35.0);

        var radLat = ggLat / 180.0 * Math.PI;
        var magic = Math.sin(radLat);
        magic = 1 - jzEE * magic * magic;
        var sqrtMagic = Math.sqrt(magic);

        dLat = (dLat * 180.0) / ((jzA * (1 - jzEE)) / (magic * sqrtMagic) * Math.PI);
        dLon = (dLon * 180.0) / (jzA / sqrtMagic * Math.cos(radLat) * Math.PI);

        return { lat: ggLat + dLat, lng: ggLon + dLon };
    }

    function gcj02Decrypt(gjLat, gjLon)//:(double)gjLat gjLon:(double)gjLon 
    {
        var gPt = gcj02Encrypt(gjLat, gjLon);
        var dLat = gPt.lat - gjLat;
        var dLon = gPt.lng - gjLon;
        return { lat: gjLat - dLat, lng: gjLon - dLon };
    }

    function bd09Decrypt(bdLat, bdLon)//:(double)bdLat bdLon:(double)bdLon
    {
        var x = bdLon - 0.0065;
        var y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
        //gcjPt.lng = z * Math.cos(theta);
        //gcjPt.lat = z * Math.sin(theta);
        return { lat: z * Math.sin(theta), lng: z * Math.cos(theta) };
    }

    function bd09Encrypt(ggLat, ggLon)//:(double)ggLat bdLon:(double)ggLon
    {
        var bdPt = {};
        var x = ggLon, y = ggLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI);
        bdPt.lng = z * Math.cos(theta) + 0.0065;
        bdPt.lat = z * Math.sin(theta) + 0.006;
        return bdPt;
    }


    function wgs84ToGcj02(location)//:(CLLocationCoordinate2D)location
    {
        return gcj02Encrypt(location.lat, location.lng); //:location.lat bdLon:location.lng];
    }

    function gcj02ToWgs84(location)//:(CLLocationCoordinate2D)location
    {
        return gcj02Decrypt(location.lat, location.lng); //[self gcj02Decrypt:location.lat gjLon:location.lng];
    }

    function wgs84ToBd09(location)//:(CLLocationCoordinate2D)location
    {
        var gcj02Pt = gcj02Encrypt(location.lat, location.lng); //[self gcj02Encrypt:location.lat bdLon:location.lng];
        return bd09Encrypt(gcj02Pt.lat, gcj02Pt.lng); //:gcj02Pt.lat bdLon:gcj02Pt.lng] ;
    }

    function gcj02ToBd09(location)//:(CLLocationCoordinate2D)location
    {
        return bd09Encrypt(location.lat, location.lng); //:location.lat bdLon:location.lng];
    }

    function bd09ToGcj02(location)//:(CLLocationCoordinate2D)location
    {
        return bd09Decrypt(location.lat, location.lng); //:location.lat bdLon:location.lng];
    }

    function bd09ToWgs84(location)//:(CLLocationCoordinate2D)location
    {
        var gcj02 = bd09ToGcj02(location);
        return gcj02Decrypt(gcj02.lat, gcj02.lng);
    }

    function load_script(xyUrl, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = xyUrl;
        //借鉴了jQuery的script跨域方法
        script.onload = script.onreadystatechange = function () {
            if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                callback && callback();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore(script, head.firstChild);
    }

    function wgs84ToBd09_BaiduAPI(lng,lat,callback) {
        var callbackName = 'backFn_cbk_' + Math.round(Math.random() * 10000);    //随机函数名
        var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=" + lng + "&y=" + lat + "&callback=window."+callbackName;
        //动态创建script标签
        load_script(xyUrl);
        window[callbackName] = function (rs) {
            delete window[callbackName];    //调用完需要删除改函数
            callback && callback(rs.x,rs.y);
        }
    }
    function distance(pointA, pointB) {
        var lat = Math.abs(pointA.lat - pointB.lat) * 2 * Math.PI * 6356752.3 / 360; //极半径，6, 356.7523 KM
        var lng = Math.abs(pointA.lng - pointB.lng) * 2 * Math.PI * 6378245.0 / 360 * Math.cos((pointA.lat + pointB.lat) / 2); //赤道半径：6378.245 KM
        return Math.sqrt(lng * lng + lat * lat);
    }

    window.GEO = {
        Baidu: { wgs84ToBd09: wgs84ToBd09_BaiduAPI },
        GPS2bd: wgs84ToBd09,
        bd2GPS: bd09ToWgs84,
        GPS2gcj: wgs84ToGcj02,
        gcj2GPS: gcj02ToWgs84,
        gcj2bd: gcj02ToBd09,
        bd2gcj: bd09ToGcj02,
        distance: distance
    };
})();
