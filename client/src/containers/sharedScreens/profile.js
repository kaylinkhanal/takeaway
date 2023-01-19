import {useState} from 'react'
const Profile = () => {
    const [file, setFile] = useState(null)
    const triggerImgSave = ()=> {
        console.log(file)
    }
    return (
    <>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button onClick={()=> triggerImgSave()}>Save avatar</button>
    </>
    )
}
export default Profile