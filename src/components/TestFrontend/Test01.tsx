import Navbar from '../Navbar';

import { useState , useEffect } from 'react';

function Test01(){
    const [ a , setA ] = useState(0);    

    function Add(){
        setA(a+1);
    }

    function Sub(){
        setA(a-1);
    }

    return (
        // <div className="row">
        //     {/* <div className="bg-info mb-3" style={{width:"200px",height:"200px"}}></div>
        //     <div className="bg-danger" style={{width:"200px",height:"200px"}}></div> */}

        //     <div className="bg-info mb-3" style={{width:"200px",height:"200px"}}></div>
        //     <div className="bg-danger" style={{width:"200px",height:"200px"}}></div> */
            
        // </div>

        <div className="row">
            <div className="bg-info col-lg-6" style={{minWidth:"200px",minHeight:"200px"}}></div>
            <div className="bg-warning col-lg-6" style={{minWidth:"200px",minHeight:"200px"}}></div> */
            <div className="bg-danger col-lg-6" style={{minWidth:"200px",minHeight:"200px"}}></div> */
        </div>
    );
}

export default Test01;