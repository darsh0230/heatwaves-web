import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const DynamicHeatmap = () => {
  const [heatData, setHeatData] = useState([]);
  const pointArray = new window.google.maps.MVCArray([]);
  const heatMap = new window.google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 20, // Adjust the radius here (larger value for a bigger radius)
  });

  useEffect(() => {
    const URL = "https://heatwaves.onrender.com/api/v1/getDevDetails";

    const mapOptions = {
      zoom: 16,
      center: new window.google.maps.LatLng(12.9716, 77.5946), // Bangalore
      mapTypeId: window.google.maps.MapTypeId.SATELLITE,
    };

    const map = new window.google.maps.Map(
      document.getElementById("map-canvas"),
      mapOptions
    );

    heatMap.setMap(map);

    const interval = setInterval(async () => {
      await axios
        .get(URL)
        .then((res) => {
          if (res.status === 200) {
            pointArray.clear();
            Array.from(res.data.result).forEach((value) => {
              if (value.temperature > value.max_temperature) {
                console.log(value.latitude, value.longitude);
                pointArray.push(
                  new window.google.maps.LatLng(value.latitude, value.longitude)
                );
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="map-canvas" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default DynamicHeatmap;
