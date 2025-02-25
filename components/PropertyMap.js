"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        height: "500px",
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "ca",
    });

    useEffect(() => {
        const fetchCords = async () => {
            try {
                const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

                if (!res || res.length === 0) {
                    setGeocodeError(true);
                    return;
                }
                const { lat, lng } = res.results[0].geometry.location;
                setLat(lat);
                setLong(lng);
                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng,
                });
            } catch (error) {
                setGeocodeError(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCords();
    }, []);

    if (loading) return (<h3>Loading...</h3>);
    if (geocodeError) return (<h3>No location found</h3>);

    return (<div>Map for {property.name}</div>)
};

export default PropertyMap;