/** GeoLocation | Recommended | Spatial region or named place where the data was gathered or about which the data is focused */

export type dcGeoLocationPoint = {
    pointLongitude: number; 
    pointLatitude: number;
}

export type dcGeoLocationBox = {
    /** Western longitudinal dimension (-180 to 180) */
    westBoundLongitude: number;
    /** Eastern longitudinal dimension (-180 to 180) */
    eastBoundLongitude: number;
    /** Southern latitudinal dimension (-90 to 90) */
    southBoundLatitude: number;
    /** Northern latitudinal dimension (-90 to 90) */
    northBoundLatitude: number;
}

export type dcPolygonPoint = {
    /** Longitudinal dimension of point (-180 to 180) */
    pointLongitude: number;
    /** Latitudinal dimension of point (-90 to 90) */
    pointLatitude: number;
}

export type dcInPolygonPoint = {
    /** Longitudinal dimension of inside point (-180 to 180) */
    pointLongitude: number;
    /** Latitudinal dimension of inside point (-90 to 90) */
    pointLatitude: number;
}

export type dcGeoLocationPolygon = {
    /** Array of points (min 4 points) defining the polygon */
    polygonPoints: dcPolygonPoint[];
    /** Optional point inside polygon (required only if polygon > half earth) */
    inPolygonPoint?: dcInPolygonPoint;
}

export type dcGeoLocationType = {
    /** A point location in space */
    geoLocationPoint?: dcGeoLocationPoint;
    /** The spatial limits of a box */
    geoLocationBox?: dcGeoLocationBox;
    /** Description of a geographic location (free text) */
    geoLocationPlace?: string;
    /** One or more polygon areas */
    geoLocationPolygon?: dcGeoLocationPolygon[];
}

/** Array of geoLocation elements (0-n occurrences) */
export type dcGeoLocations = dcGeoLocationType[];