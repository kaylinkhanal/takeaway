export const responseHandler = (response , errorMsg)=>{
    if(errorMsg){
        return errorMsg
    }
    else if(response.status === 401 ){
        return "unauthorized user"
      }else if(response.status === 200){
        return "success"
      }else if(response.status === 500){
        return "Internal Server Error"
      }else{
          return "something went wrong"
      }
}