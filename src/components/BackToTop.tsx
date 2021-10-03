import { useState , useContext , useEffect } from "react"
import iconPic from '..\src\pics\backToTop.png'

const BackToTop = ({showBelow} : {showBelow:any}) => {
    
    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (show == false) {
                setShow(true)
            }
        }
        else {
            if (show == true) {
                setShow(false)
            }
        }
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    const handleClick = () => {
        window[`scrollTo`]({top: 0, behavior: `smooth`})
    }

    return (
        <div>
            {show &&
                <button type="button" className="btn btn-secondary p-2" id="topbtn" onClick={handleClick} style={{position: "fixed", bottom: "5%", right: "5%", cursor: "pointer"}}>Back To Top</button>
            }      
        </div>
    )
}

export default BackToTop