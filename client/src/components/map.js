import {useState, useMemo, useCallback, useRef} from "react";
import {useMapEvents, MapContainer, TileLayer,Marker, Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import {useDispatch, useSelector} from "react-redux"
import {setSenderLocationLatLng,setReceiverLocationLatLng} from "../redux/reducers/locationSlice"
import L from 'leaflet';
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
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "data:image/jpeg;base64,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",
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
    const calculateDistance = ()=> {
      //
      //generate distance 
      alert(450)
      //setDistance(329)
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