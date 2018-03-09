var dataWF = "";

document.getElementById('link_wf').addEventListener('click', downloadWF);

function downloadWF() {

    var file = new File([dataWF], "map.pgw", {
        type: "text/plain;charset=utf-8"
    });
    saveAs(file);


}

function calculateWF(width, height, dpi, format, unit, zoom, center, bearing, pitch, bounds) {

    var _NE3857 = latLonTo3857(bounds._ne.lat, bounds._ne.lng);
    var _SW3857 = latLonTo3857(bounds._sw.lat, bounds._sw.lng);
    var resW = (_NE3857.lng - _SW3857.lng) / width;
    var resH = (_NE3857.lat - _SW3857.lat) / height;


    dataWF = resW + "\n" + "0.0 \n" + "0.0 \n" + "-" + resH + "\n" + _SW3857.lng + "\n" + _NE3857.lat +
        "\n";

    document.getElementById('link_wf').innerHTML = '<a href="#">Fitxer map.pgw</a>';


}

function toPixelsNum(length, unit) {

    var conversionFactor = 96;
    if (unit == 'mm') {
        conversionFactor /= 25.4;
    }

    return parseFloat(conversionFactor * length);
}

function latLonTo3857(lat, lon) {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return {
        'lat': y,
        'lng': x
    }
}