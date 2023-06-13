import "./Modal.css"
import { useEffect } from "react"

const Modal = ({notifContent, closeNotif}) => {

   useEffect(()=>{

    setTimeout (()=>{
        closeNotif()
    }, 2000)
        
   })
  return (<div >
    <div>{notifContent}</div>
   
  </div>)
}

export default Modal

/*zavírací xko 
return (<>
    <div>{notifContent}</div>
   <p onClick={closeNotif}>X</p>
  </>)*/