import {useState, useMemo, useCallback, useRef} from "react";
import {useMapEvents, MapContainer, TileLayer,Marker, Popup,Polyline} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {useDispatch, useSelector} from "react-redux"
import {setSenderLocationLatLng,setReceiverLocationLatLng, setDistance} from "../redux/reducers/locationSlice"
import L from 'leaflet';
import '../App.css'
import { notification } from 'antd';

const iconPerson = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/17/17736.png",
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/17/17736.png",
  iconSize: [10, 20],
})

const dragSenderMarker = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const dragReceiverMarker = L.icon({
  iconSize: [30, 45],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1180/1180058.png?w=740&t=st=1675612962~exp=1675613562~hmac=72aeaef81f5c310472a9da30bdcdfee7807d60f8593016c05f9460f1037eae64",
 
});
const Map = ()=> {
    const {senderLocationLatLng,receiverLocationLatLng} = useSelector(state=> state.location)
    const dispatch = useDispatch()
    const toRadian = angle => (angle * Math.PI) / 180;
    const lat1 = toRadian(receiverLocationLatLng.lat);
    const lng1 = toRadian(receiverLocationLatLng.lng);
    const lat2 = toRadian(senderLocationLatLng.lat);
    const lng2 = toRadian(senderLocationLatLng.lng);

    const calculateDistance = ()=> {
      const R = 6371
      const a =
    Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) * Math.sin((lng2 - lng1) / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(R * c);
  notification.open({
    message: `Distance between Sender and Receiver is: ${distance}`
    
  });
  dispatch(setDistance(distance))
    }

    const {lat, lng} = senderLocationLatLng

    const center = {
      lat: 27.68564550564005,
      lng: 85.3445145828365,
    }



    
  const geoCodeLatLng =(lat, lng)=> {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.REACT_APP_MAP_API_KEY}`)
    .then((res)=> res.json())
    .then((data)=> notification.open({ message: `${data.features[0].properties.formatted}` }))
  }

  function SenderDraggableMarker() {

    const {senderLocationLatLng,} = useSelector(state=> state.location)
    const dispatch = useDispatch()
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)


    const eventHandlers = useMemo(
      (e) => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const latLngObj = {
              lat: marker.getLatLng().lat,
              lng: marker.getLatLng().lng
            }
            dispatch(setSenderLocationLatLng(latLngObj))
            calculateDistance()
            geoCodeLatLng(marker.getLatLng().lat, marker.getLatLng().lng)
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={senderLocationLatLng.lat ? senderLocationLatLng : center}
        icon={dragSenderMarker}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span >
            This marker is draggable
          </span>
        </Popup>
      </Marker>
    )
  }

  function ReceiverDraggableMarker() {
    const dispatch = useDispatch()
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
      (e) => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const latLngObj = {
              lat: marker.getLatLng().lat,
              lng: marker.getLatLng().lng
            }
            dispatch(setReceiverLocationLatLng(latLngObj))


          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={receiverLocationLatLng.lat ? receiverLocationLatLng : center}
        icon={dragReceiverMarker}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span >
            <input placeholder="enter sender name" />
          </span>
        </Popup>
      </Marker>
    )
  }
  return(
      <>
      <MapContainer  center={lat ? [lat, lng] : [ 27.68564550564005,85.3445145828365]} zoom={10} scrollWheelZoom={false}
                style={{ height: "60vh", width:"40vw" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
             <SenderDraggableMarker/>
             <ReceiverDraggableMarker/>
             {lat &&  <Polyline color="#003312" positions={[senderLocationLatLng, receiverLocationLatLng]} /> }
            
   </MapContainer>
    </>
  )
}
export default Map