import {useSelector, useDispatch} from 'react-redux';
const Theme = ()=>{
    const {role} = useSelector(state=> state.user)
    if(role === 'admin') return 'orange'
    return 'blue'
}
export default Theme
