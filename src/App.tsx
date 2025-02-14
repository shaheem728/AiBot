// import { useState } from 'react'
// import { token } from './action/api'
import SideBar from "./component/SideBar"
import Search from "./component/Search"
function App() {
  return (
    <section className="staic">
    <div className="absolute  left-0">
      <SideBar/>
    </div>
    <div className="absolute  left-[30em]  top-[35em]">
    <Search/>
    </div>  
      
    </section>
  )
}

export default App
