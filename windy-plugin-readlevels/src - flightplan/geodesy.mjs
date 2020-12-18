

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Latitude/longitude spherical geodesy tools                         (c) Chris Veness 2002-2018  */
/*                                                                                   MIT Licence  */
/* www.movable-type.co.uk/scripts/latlong.html                                                    */
/* www.movable-type.co.uk/scripts/geodesy/docs/module-latlon-spherical.html                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */




'use strict';

function LatLon(lat, lon) {
        if (!(this instanceof LatLon)) return new LatLon(lat, lon);
        this.lat = Number(lat);
        this.lon = Number(lon);
}



//if (typeof module!='undefined' && module.exports) var Dms = require('./dms.js'); // = import Dms from 'dms.js'


/**
 * Library of geodesy functions for operations on a spherical earth model.
 *
 * @module   latlon-spherical
 * @requires dms
 */


/**
 * Creates a LatLon point on the earth's surface at the specified latitude / longitude.
 *
 * @constructor
 * @param {number} lat - Latitude in degrees.
 * @param {number} lon - Longitude in degrees.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 */


/**
 * Returns the distance from ‘this’ point to destination point (using haversine formula).
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance between this point and destination point, in same units as radius.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var d = p1.distanceTo(p2); // 404.3 km
 */
LatLon.prototype.distanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    // a = sin²(?LAT/2) + cos(LAT1)·cos(LAT2)·sin²(??/2)
    // tand = v(a) / v(1-a)
    // see mathforum.org/library/drmath/view/51879.html for derivation

    var R = radius;
    var LAT1 = this.lat.toRadians(),  LON1 = this.lon.toRadians();
    var LAT2 = point.lat.toRadians(), LON2 = point.lon.toRadians();
    var deltaLAT = LAT2 - LAT1;
    var deltaLON = LON2 - LON1;

    var a = Math.sin(deltaLAT/2) * Math.sin(deltaLAT/2)
          + Math.cos(LAT1) * Math.cos(LAT2)
          * Math.sin(deltaLON/2) * Math.sin(deltaLON/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
};


/**
 * Returns the (initial) bearing from ‘this’ point to destination point.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @returns {number} Initial bearing in degrees from north.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var b1 = p1.bearingTo(p2); // 156.2°
 */
LatLon.prototype.bearingTo = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    // tantheta = sindeltaLON·cosLAT2 / cosLAT1·sinLAT2 - sinLAT1·cosLAT2·cosdeltaLON
    // see mathforum.org/library/drmath/view/55417.html for derivation

    var LAT1 = this.lat.toRadians(), LAT2 = point.lat.toRadians();
    var deltaLON = (point.lon-this.lon).toRadians();
    var y = Math.sin(deltaLON) * Math.cos(LAT2);
    var x = Math.cos(LAT1)*Math.sin(LAT2) -
            Math.sin(LAT1)*Math.cos(LAT2)*Math.cos(deltaLON);
    var theta = Math.atan2(y, x);

    return (theta.toDegrees()+360) % 360;
};


/**
 * Returns final bearing arriving at destination destination point from ‘this’ point; the final bearing
 * will differ from the initial bearing by varying degrees according to distance and latitude.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @returns {number} Final bearing in degrees from north.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var b2 = p1.finalBearingTo(p2); // 157.9°
 */
LatLon.prototype.finalBearingTo = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    // get initial bearing from destination point to this point & reverse it by adding 180°
    return ( point.bearingTo(this)+180 ) % 360;
};


/**
 * Returns the midpoint between ‘this’ point and the supplied point.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @returns {LatLon} Midpoint between this point and the supplied point.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var pMid = p1.midpointTo(p2); // 50.5363°N, 001.2746°E
 */
LatLon.prototype.midpointTo = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    // LATm = atan2( sinLAT1 + sinLAT2, v( (cosLAT1 + cosLAT2·cosdeltaLON) · (cosLAT1 + cosLAT2·cosdeltaLON) ) + cos²LAT2·sin²deltaLON )
    // LONm = LON1 + atan2(cosLAT2·sindeltaLON, cosLAT1 + cosLAT2·cosdeltaLON)
    // see mathforum.org/library/drmath/view/51822.html for derivation

    var LAT1 = this.lat.toRadians(), LON1 = this.lon.toRadians();
    var LAT2 = point.lat.toRadians();
    var deltaLON = (point.lon-this.lon).toRadians();

    var Bx = Math.cos(LAT2) * Math.cos(deltaLON);
    var By = Math.cos(LAT2) * Math.sin(deltaLON);

    var x = Math.sqrt((Math.cos(LAT1) + Bx) * (Math.cos(LAT1) + Bx) + By * By);
    var y = Math.sin(LAT1) + Math.sin(LAT2);
    var LAT3 = Math.atan2(y, x);

    var LON3 = LON1 + Math.atan2(By, Math.cos(LAT1) + Bx);

    return new LatLon(LAT3.toDegrees(), (LON3.toDegrees()+540)%360-180); // normalise to -180..+180°
};


/**
 * Returns the point at given fraction between ‘this’ point and specified point.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} fraction - Fraction between the two points (0 = this point, 1 = specified point).
 * @returns {LatLon} Intermediate point between this point and destination point.
 *
 * @example
 *   let p1 = new LatLon(52.205, 0.119);
 *   let p2 = new LatLon(48.857, 2.351);
 *   let pMid = p1.intermediatePointTo(p2, 0.25); // 51.3721°N, 000.7073°E
 */
LatLon.prototype.intermediatePointTo = function(point, fraction) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    var LAT1 = this.lat.toRadians(), LON1 = this.lon.toRadians();
    var LAT2 = point.lat.toRadians(), LON2 = point.lon.toRadians();
    var sinLAT1 = Math.sin(LAT1), cosLAT1 = Math.cos(LAT1), sinLON1 = Math.sin(LON1), cosLON1 = Math.cos(LON1);
    var sinLAT2 = Math.sin(LAT2), cosLAT2 = Math.cos(LAT2), sinLON2 = Math.sin(LON2), cosLON2 = Math.cos(LON2);

    // distance between points
    var deltaLAT = LAT2 - LAT1;
    var deltaLON = LON2 - LON1;
    var a = Math.sin(deltaLAT/2) * Math.sin(deltaLAT/2)
        + Math.cos(LAT1) * Math.cos(LAT2) * Math.sin(deltaLON/2) * Math.sin(deltaLON/2);
    var delta = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var A = Math.sin((1-fraction)*delta) / Math.sin(delta);
    var B = Math.sin(fraction*delta) / Math.sin(delta);

    var x = A * cosLAT1 * cosLON1 + B * cosLAT2 * cosLON2;
    var y = A * cosLAT1 * sinLON1 + B * cosLAT2 * sinLON2;
    var z = A * sinLAT1 + B * sinLAT2;

    var LAT3 = Math.atan2(z, Math.sqrt(x*x + y*y));
    var LON3 = Math.atan2(y, x);

    return new LatLon(LAT3.toDegrees(), (LON3.toDegrees()+540)%360-180); // normalise lon to -180..+180°
};


/**
 * Returns the destination point from ‘this’ point having travelled the given distance on the
 * given initial bearing (bearing normally varies around path followed).
 *
 * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
 * @param   {number} bearing - Initial bearing in degrees from north.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {LatLon} Destination point.
 *
 * @example
 *     var p1 = new LatLon(51.4778, -0.0015);
 *     var p2 = p1.destinationPoint(7794, 300.7); // 51.5135°N, 000.0983°W
 */
LatLon.prototype.destinationPoint = function(distance, bearing, radius) {
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    // sinLAT2 = sinLAT1·cosdelta + cosLAT1·sindelta·costheta
    // tandeltaLON = sintheta·sindelta·cosLAT1 / cosdelta-sinLAT1·sinLAT2
    // see mathforum.org/library/drmath/view/52049.html for derivation

    var delta = Number(distance) / radius; // angular distance in radians
    var theta = Number(bearing).toRadians();

    var LAT1 = this.lat.toRadians();
    var LON1 = this.lon.toRadians();

    var sinLAT1 = Math.sin(LAT1), cosLAT1 = Math.cos(LAT1);
    var sindelta = Math.sin(delta), cosdelta = Math.cos(delta);
    var sintheta = Math.sin(theta), costheta = Math.cos(theta);

    var sinLAT2 = sinLAT1*cosdelta + cosLAT1*sindelta*costheta;
    var LAT2 = Math.asin(sinLAT2);
    var y = sintheta * sindelta * cosLAT1;
    var x = cosdelta - sinLAT1 * sinLAT2;
    var LON2 = LON1 + Math.atan2(y, x);

    return new LatLon(LAT2.toDegrees(), (LON2.toDegrees()+540)%360-180); // normalise to -180..+180°
};


/**
 * Returns the point of intersection of two paths defined by point and bearing.
 *
 * @param   {LatLon} p1 - First point.
 * @param   {number} brng1 - Initial bearing from first point.
 * @param   {LatLon} p2 - Second point.
 * @param   {number} brng2 - Initial bearing from second point.
 * @returns {LatLon|null} Destination point (null if no unique intersection defined).
 *
 * @example
 *     var p1 = LatLon(51.8853, 0.2545), brng1 = 108.547;
 *     var p2 = LatLon(49.0034, 2.5735), brng2 =  32.435;
 *     var pInt = LatLon.intersection(p1, brng1, p2, brng2); // 50.9078°N, 004.5084°E
 */
LatLon.intersection = function(p1, brng1, p2, brng2) {
    if (!(p1 instanceof LatLon)) throw new TypeError('p1 is not LatLon object');
    if (!(p2 instanceof LatLon)) throw new TypeError('p2 is not LatLon object');

    // see www.edwilliams.org/avform.htm#Intersection

    var LAT1 = p1.lat.toRadians(), LON1 = p1.lon.toRadians();
    var LAT2 = p2.lat.toRadians(), LON2 = p2.lon.toRadians();
    var theta13 = Number(brng1).toRadians(), theta23 = Number(brng2).toRadians();
    var deltaLAT = LAT2-LAT1, deltaLON = LON2-LON1;

    // angular distance p1-p2
    var delta12 = 2*Math.asin( Math.sqrt( Math.sin(deltaLAT/2)*Math.sin(deltaLAT/2)
        + Math.cos(LAT1)*Math.cos(LAT2)*Math.sin(deltaLON/2)*Math.sin(deltaLON/2) ) );
    if (delta12 == 0) return null;

    // initial/final bearings between points
    var costhetaa = ( Math.sin(LAT2) - Math.sin(LAT1)*Math.cos(delta12) ) / ( Math.sin(delta12)*Math.cos(LAT1) );
    var costhetab = ( Math.sin(LAT1) - Math.sin(LAT2)*Math.cos(delta12) ) / ( Math.sin(delta12)*Math.cos(LAT2) );
    var thetaa = Math.acos( Math.min(Math.max(costhetaa, -1), 1) ); // protect against rounding errors
    var thetab = Math.acos( Math.min(Math.max(costhetab, -1), 1) ); // protect against rounding errors

    var theta12 = Math.sin(LON2-LON1)>0 ? thetaa : 2*Math.PI-thetaa;
    var theta21 = Math.sin(LON2-LON1)>0 ? 2*Math.PI-thetab : thetab;

    var alpha1 = theta13 - theta12; // angle 2-1-3
    var alpha2 = theta21 - theta23; // angle 1-2-3

    if (Math.sin(alpha1)==0 && Math.sin(alpha2)==0) return null; // infinite intersections
    if (Math.sin(alpha1)*Math.sin(alpha2) < 0) return null;      // ambiguous intersection

    var alpha3 = Math.acos( -Math.cos(alpha1)*Math.cos(alpha2) + Math.sin(alpha1)*Math.sin(alpha2)*Math.cos(delta12) );
    var delta13 = Math.atan2( Math.sin(delta12)*Math.sin(alpha1)*Math.sin(alpha2), Math.cos(alpha2)+Math.cos(alpha1)*Math.cos(alpha3) );
    var LAT3 = Math.asin( Math.sin(LAT1)*Math.cos(delta13) + Math.cos(LAT1)*Math.sin(delta13)*Math.cos(theta13) );
    var deltaLON13 = Math.atan2( Math.sin(theta13)*Math.sin(delta13)*Math.cos(LAT1), Math.cos(delta13)-Math.sin(LAT1)*Math.sin(LAT3) );
    var LON3 = LON1 + deltaLON13;

    return new LatLon(LAT3.toDegrees(), (LON3.toDegrees()+540)%360-180); // normalise to -180..+180°
};


/**
 * Returns (signed) distance from ‘this’ point to great circle defined by start-point and end-point.
 *
 * @param   {LatLon} pathStart - Start point of great circle path.
 * @param   {LatLon} pathEnd - End point of great circle path.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance to great circle (-ve if to left, +ve if to right of path).
 *
 * @example
 *   var pCurrent = new LatLon(53.2611, -0.7972);
 *   var p1 = new LatLon(53.3206, -1.7297);
 *   var p2 = new LatLon(53.1887,  0.1334);
 *   var d = pCurrent.crossTrackDistanceTo(p1, p2);  // -307.5 m
 */
LatLon.prototype.crossTrackDistanceTo = function(pathStart, pathEnd, radius) {
    if (!(pathStart instanceof LatLon)) throw new TypeError('pathStart is not LatLon object');
    if (!(pathEnd instanceof LatLon)) throw new TypeError('pathEnd is not LatLon object');
    var R = (radius === undefined) ? 6371e3 : Number(radius);

    var delta13 = pathStart.distanceTo(this, R) / R;
    var theta13 = pathStart.bearingTo(this).toRadians();
    var theta12 = pathStart.bearingTo(pathEnd).toRadians();

    var deltaxt = Math.asin(Math.sin(delta13) * Math.sin(theta13-theta12));

    return deltaxt * R;
};


/**
 * Returns how far ‘this’ point is along a path from from start-point, heading towards end-point.
 * That is, if a perpendicular is drawn from ‘this’ point to the (great circle) path, the along-track
 * distance is the distance from the start point to where the perpendicular crosses the path.
 *
 * @param   {LatLon} pathStart - Start point of great circle path.
 * @param   {LatLon} pathEnd - End point of great circle path.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance along great circle to point nearest ‘this’ point.
 *
 * @example
 *   var pCurrent = new LatLon(53.2611, -0.7972);
 *   var p1 = new LatLon(53.3206, -1.7297);
 *   var p2 = new LatLon(53.1887,  0.1334);
 *   var d = pCurrent.alongTrackDistanceTo(p1, p2);  // 62.331 km
 */
LatLon.prototype.alongTrackDistanceTo = function(pathStart, pathEnd, radius) {
    if (!(pathStart instanceof LatLon)) throw new TypeError('pathStart is not LatLon object');
    if (!(pathEnd instanceof LatLon)) throw new TypeError('pathEnd is not LatLon object');
    var R = (radius === undefined) ? 6371e3 : Number(radius);

    var delta13 = pathStart.distanceTo(this, R) / R;
    var theta13 = pathStart.bearingTo(this).toRadians();
    var theta12 = pathStart.bearingTo(pathEnd).toRadians();

    var deltaxt = Math.asin(Math.sin(delta13) * Math.sin(theta13-theta12));

    var deltaat = Math.acos(Math.cos(delta13) / Math.abs(Math.cos(deltaxt)));

    return deltaat*Math.sign(Math.cos(theta12-theta13)) * R;
};


/**
 * Returns maximum latitude reached when travelling on a great circle on given bearing from this
 * point ('Clairaut's formula'). Negate the result for the minimum latitude (in the Southern
 * hemisphere).
 *
 * The maximum latitude is independent of longitude; it will be the same for all points on a given
 * latitude.
 *
 * @param {number} bearing - Initial bearing.
 * @param {number} latitude - Starting latitude.
 */
LatLon.prototype.maxLatitude = function(bearing) {
    var theta = Number(bearing).toRadians();

    var LAT = this.lat.toRadians();

    var LATMax = Math.acos(Math.abs(Math.sin(theta)*Math.cos(LAT)));

    return LATMax.toDegrees();
};


/**
 * Returns the pair of meridians at which a great circle defined by two points crosses the given
 * latitude. If the great circle doesn't reach the given latitude, null is returned.
 *
 * @param {LatLon} point1 - First point defining great circle.
 * @param {LatLon} point2 - Second point defining great circle.
 * @param {number} latitude - Latitude crossings are to be determined for.
 * @returns {Object|null} Object containing { lon1, lon2 } or null if given latitude not reached.
 */
LatLon.crossingParallels = function(point1, point2, latitude) {
    var LAT = Number(latitude).toRadians();

    var LAT1 = point1.lat.toRadians();
    var LON1 = point1.lon.toRadians();
    var LAT2 = point2.lat.toRadians();
    var LON2 = point2.lon.toRadians();

    var deltaLON = LON2 - LON1;

    var x = Math.sin(LAT1) * Math.cos(LAT2) * Math.cos(LAT) * Math.sin(deltaLON);
    var y = Math.sin(LAT1) * Math.cos(LAT2) * Math.cos(LAT) * Math.cos(deltaLON) - Math.cos(LAT1) * Math.sin(LAT2) * Math.cos(LAT);
    var z = Math.cos(LAT1) * Math.cos(LAT2) * Math.sin(LAT) * Math.sin(deltaLON);

    if (z*z > x*x + y*y) return null; // great circle doesn't reach latitude

    var LONm = Math.atan2(-y, x);                  // longitude at max latitude
    var deltaLONi = Math.acos(z / Math.sqrt(x*x+y*y)); // deltaLON from LONm to intersection points

    var LONi1 = LON1 + LONm - deltaLONi;
    var LONi2 = LON1 + LONm + deltaLONi;

    return { lon1: (LONi1.toDegrees()+540)%360-180, lon2: (LONi2.toDegrees()+540)%360-180 }; // normalise to -180..+180°
};


/* Rhumb - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/**
 * Returns the distance travelling from ‘this’ point to destination point along a rhumb line.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance in km between this point and destination point (same units as radius).
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = new LatLon(50.964, 1.853);
 *     var d = p1.distanceTo(p2); // 40.31 km
 */
LatLon.prototype.rhumbDistanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    // see www.edwilliams.org/avform.htm#Rhumb

    var R = radius;
    var LAT1 = this.lat.toRadians(), LAT2 = point.lat.toRadians();
    var deltaLAT = LAT2 - LAT1;
    var deltaLON = Math.abs(point.lon-this.lon).toRadians();
    // if dLon over 180° take shorter rhumb line across the anti-meridian:
    if (deltaLON > Math.PI) deltaLON -= 2*Math.PI;

    // on Mercator projection, longitude distances shrink by latitude; q is the 'stretch factor'
    // q becomes ill-conditioned along E-W line (0/0); use empirical tolerance to avoid it
    var deltapsi = Math.log(Math.tan(LAT2/2+Math.PI/4)/Math.tan(LAT1/2+Math.PI/4));
    var q = Math.abs(deltapsi) > 10e-12 ? deltaLAT/deltapsi : Math.cos(LAT1);

    // distance is pythagoras on 'stretched' Mercator projection
    var delta = Math.sqrt(deltaLAT*deltaLAT + q*q*deltaLON*deltaLON); // angular distance in radians
    var dist = delta * R;

    return dist;
};


/**
 * Returns the bearing from ‘this’ point to destination point along a rhumb line.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @returns {number} Bearing in degrees from north.
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = new LatLon(50.964, 1.853);
 *     var d = p1.rhumbBearingTo(p2); // 116.7 m
 */
LatLon.prototype.rhumbBearingTo = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    var LAT1 = this.lat.toRadians(), LAT2 = point.lat.toRadians();
    var deltaLON = (point.lon-this.lon).toRadians();
    // if dLon over 180° take shorter rhumb line across the anti-meridian:
    if (deltaLON >  Math.PI) deltaLON -= 2*Math.PI;
    if (deltaLON < -Math.PI) deltaLON += 2*Math.PI;

    var deltapsi = Math.log(Math.tan(LAT2/2+Math.PI/4)/Math.tan(LAT1/2+Math.PI/4));

    var theta = Math.atan2(deltaLON, deltapsi);

    return (theta.toDegrees()+360) % 360;
};


/**
 * Returns the destination point having travelled along a rhumb line from ‘this’ point the given
 * distance on the  given bearing.
 *
 * @param   {number} distance - Distance travelled, in same units as earth radius (default: metres).
 * @param   {number} bearing - Bearing in degrees from north.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {LatLon} Destination point.
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = p1.rhumbDestinationPoint(40300, 116.7); // 50.9642°N, 001.8530°E
 */
LatLon.prototype.rhumbDestinationPoint = function(distance, bearing, radius) {
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    var delta = Number(distance) / radius; // angular distance in radians
    var LAT1 = this.lat.toRadians(), LON1 = this.lon.toRadians();
    var theta = Number(bearing).toRadians();

    var deltaLAT = delta * Math.cos(theta);
    var LAT2 = LAT1 + deltaLAT;

    // check for some daft bugger going past the pole, normalise latitude if so
    if (Math.abs(LAT2) > Math.PI/2) LAT2 = LAT2>0 ? Math.PI-LAT2 : -Math.PI-LAT2;

    var deltapsi = Math.log(Math.tan(LAT2/2+Math.PI/4)/Math.tan(LAT1/2+Math.PI/4));
    var q = Math.abs(deltapsi) > 10e-12 ? deltaLAT / deltapsi : Math.cos(LAT1); // E-W course becomes ill-conditioned with 0/0

    var deltaLON = delta*Math.sin(theta)/q;
    var LON2 = LON1 + deltaLON;

    return new LatLon(LAT2.toDegrees(), (LON2.toDegrees()+540) % 360 - 180); // normalise to -180..+180°
};


/**
 * Returns the loxodromic midpoint (along a rhumb line) between ‘this’ point and second point.
 *
 * @param   {LatLon} point - Latitude/longitude of second point.
 * @returns {LatLon} Midpoint between this point and second point.
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338);
 *     var p2 = new LatLon(50.964, 1.853);
 *     var pMid = p1.rhumbMidpointTo(p2); // 51.0455°N, 001.5957°E
 */
LatLon.prototype.rhumbMidpointTo = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    // see mathforum.org/kb/message.jspa?messageID=148837

    var LAT1 = this.lat.toRadians(), LON1 = this.lon.toRadians();
    var LAT2 = point.lat.toRadians(), LON2 = point.lon.toRadians();

    if (Math.abs(LON2-LON1) > Math.PI) LON1 += 2*Math.PI; // crossing anti-meridian

    var LAT3 = (LAT1+LAT2)/2;
    var f1 = Math.tan(Math.PI/4 + LAT1/2);
    var f2 = Math.tan(Math.PI/4 + LAT2/2);
    var f3 = Math.tan(Math.PI/4 + LAT3/2);
    var LON3 = ( (LON2-LON1)*Math.log(f3) + LON1*Math.log(f2) - LON2*Math.log(f1) ) / Math.log(f2/f1);

    if (!isFinite(LON3)) LON3 = (LON1+LON2)/2; // parallel of latitude

    var p = LatLon(LAT3.toDegrees(), (LON3.toDegrees()+540)%360-180); // normalise to -180..+180°

    return p;
};


/* Area - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Calculates the area of a spherical polygon where the sides of the polygon are great circle
 * arcs joining the vertices.
 *
 * @param   {LatLon[]} polygon - Array of points defining vertices of the polygon
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} The area of the polygon, in the same units as radius.
 *
 * @example
 *   var polygon = [new LatLon(0,0), new LatLon(1,0), new LatLon(0,1)];
 *   var area = LatLon.areaOf(polygon); // 6.18e9 m²
 */
LatLon.areaOf = function(polygon, radius) {
    // uses method due to Karney: osgeo-org.1560.x6.nabble.com/Area-of-a-spherical-polygon-td3841625.html;
    // for each edge of the polygon, tan(E/2) = tan(deltaLON/2)·(tan(LAT1/2) + tan(LAT2/2)) / (1 + tan(LAT1/2)·tan(LAT2/2))
    // where E is the spherical excess of the trapezium obtained by extending the edge to the equator

    var R = (radius === undefined) ? 6371e3 : Number(radius);

    // close polygon so that last point equals first point
    var closed = polygon[0].equals(polygon[polygon.length-1]);
    if (!closed) polygon.push(polygon[0]);

    var nVertices = polygon.length - 1;

    var S = 0; // spherical excess in steradians
    for (var v=0; v<nVertices; v++) {
        var LAT1 = polygon[v].lat.toRadians();
        var LAT2 = polygon[v+1].lat.toRadians();
        var deltaLON = (polygon[v+1].lon - polygon[v].lon).toRadians();
        var E = 2 * Math.atan2(Math.tan(deltaLON/2) * (Math.tan(LAT1/2)+Math.tan(LAT2/2)), 1 + Math.tan(LAT1/2)*Math.tan(LAT2/2));
        S += E;
    }

    if (isPoleEnclosedBy(polygon)) S = Math.abs(S) - 2*Math.PI;

    var A = Math.abs(S * R*R); // area in units of R

    if (!closed) polygon.pop(); // restore polygon to pristine condition

    return A;

    // returns whether polygon encloses pole: sum of course deltas around pole is 0° rather than
    // normal ±360°: blog.element84.com/determining-if-a-spherical-polygon-contains-a-pole.html
    function isPoleEnclosedBy(polygon) {
        // TODO: any better test than this?
        var Sdelta = 0;
        var prevBrng = polygon[0].bearingTo(polygon[1]);
        for (var v=0; v<polygon.length-1; v++) {
            var initBrng = polygon[v].bearingTo(polygon[v+1]);
            var finalBrng = polygon[v].finalBearingTo(polygon[v+1]);
            Sdelta += (initBrng - prevBrng + 540) % 360 - 180;
            Sdelta += (finalBrng - initBrng + 540) % 360 - 180;
            prevBrng = finalBrng;
        }
        var initBrng = polygon[0].bearingTo(polygon[1]);
        sigmadelta += (initBrng - prevBrng + 540) % 360 - 180;
        // TODO: fix (intermittant) edge crossing pole - eg (85,90), (85,0), (85,-90)
        var enclosed = Math.abs(sigmadelta) < 90; // 0°-ish
        return enclosed;
    }
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


/**
 * Checks if another point is equal to ‘this’ point.
 *
 * @param   {LatLon} point - Point to be compared against this point.
 * @returns {bool}   True if points are identical.
 *
 * @example
 *   var p1 = new LatLon(52.205, 0.119);
 *   var p2 = new LatLon(52.205, 0.119);
 *   var equal = p1.equals(p2); // true
 */
LatLon.prototype.equals = function(point) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

    if (this.lat != point.lat) return false;
    if (this.lon != point.lon) return false;

    return true;
};


/**
 * Returns a string representation of ‘this’ point, formatted as degrees, degrees+minutes, or
 * degrees+minutes+seconds.
 *
 * @param   {string} [format=dms] - Format point as 'd', 'dm', 'dms'.
 * @param   {number} [dp=0|2|4] - Number of decimal places to use - default 0 for dms, 2 for dm, 4 for d.
 * @returns {string} Comma-separated latitude/longitude.
 */
LatLon.prototype.toString = function(format, dp) {
    return Dms.toLat(this.lat, format, dp) + ', ' + Dms.toLon(this.lon, format, dp);
};


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}

/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
//if (typeof module != 'undefined' && module.exports) module.exports = LatLon; // = export default LatLon


export default  LatLon 
