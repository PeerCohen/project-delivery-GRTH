import React, { memo, useEffect } from 'react';
import { Loader } from 'google-maps';
// new
// AIzaSyA0cLYdc8dTMg2Mia96KbLaozHModyNvQM
// AIzaSyA0cLYdc8dTMg2Mia96KbLaozHModyNvQM
const options = {
  /* todo */
};
const loader = new Loader('AIzaSyA0cLYdc8dTMg2Mia96KbLaozHModyNvQM', options);

function Map({ row }) {
  console.log('row', row);
  const { latitudeFrom, longitudeFrom, latitudeTo, longitudeTo } = row;

  useEffect(() => {
    async function init() {
      const google = await loader.load();
      const start = new google.maps.LatLng(latitudeFrom, longitudeFrom);
      const end = new google.maps.LatLng(latitudeTo, longitudeTo);
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 7,
      });
      directionsRenderer.setMap(map);
      const selectedMode = 'DRIVING';
      const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[selectedMode],
      };
      directionsService.route(request, function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        }
      });
    }
    init();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default memo(Map);
