"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "@/components/Spinner";

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
                // setGeocodeError(true);
                setLat(46.149394);
                setLong(-75.485938);
                console.log(error);
            } finally {

                setLoading(false);
            }
        }
        fetchCords();
    }, []);

    if (loading) return <Spinner />;
    if (geocodeError) return (<h3>No location found</h3>);

    return (
        !loading && 
        <Map
          // https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: long,
            latitude: lat,
            zoom: 15,
          }}
          style={{ width: "100%", height: "500px" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={long} latitude={lat} anchor="bottom">
                <Image src={pin} alt="location" width={40} height={40}/>
            </Marker>
        </Map>
    )
};

export default PropertyMap;