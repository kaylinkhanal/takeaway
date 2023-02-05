import {useState, useMemo, useCallback, useRef} from "react";
import {useMapEvents, MapContainer, TileLayer,Marker, Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {useDispatch, useSelector} from "react-redux"
import {setSenderLocationLatLng,setReceiverLocationLatLng} from "../redux/reducers/locationSlice"
import L from 'leaflet';
import '../App.css'

const iconPerson = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/17/17736.png",
    iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/17/17736.png",
    iconSize: [10,20 ],
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
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  className: "drag-receiver-marker",
});
const Map = ()=> {
    const {senderLocationLatLng} = useSelector(state=> state.location)
    const {lat, lng} = senderLocationLatLng

    const center = {
      lat: 27.68564550564005,
      lng: 85.3445145828365,
    }
    
  function DraggableMarker() {
    const {senderLocationLatLng} = useSelector(state=> state.location)

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
    const {receiverLocationLatLng,senderLocationLatLng} = useSelector(state=> state.location)
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

  const distance = R * c;
  console.log(distance);
  alert(distance)

      // const receiver = L.latLng(receiverLocationLatLng);
      // const sender = L.latLng(senderLocationLatLng);
      // const distance = receiver.distanceTo(sender);
      // alert(distance);
    }
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
              calculateDistance()
            
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
           <input placeholder="enter sender name"/>
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
             <DraggableMarker/>
             <ReceiverDraggableMarker/>
   </MapContainer>
    </>
  )
  }
  export default Map