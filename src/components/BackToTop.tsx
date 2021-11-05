import { useState , useContext , useEffect } from "react"
import iconPic from '..\src\pics\backToTop.png'
import styled from "styled-components"

const BackToTop = (probs: any) => {
    
    const [show, setShow] = useState(probs.showBelow ? false : true)

    let lang = probs.lang === "en" ? "Bact To Top" : "กลับไปด้านบน"

    const handleScroll = () => {
        if (window.pageYOffset > probs.showBelow) {
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
        if (probs.showBelow) {
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
                <button type="button" className="btn btn-secondary p-2" id="topbtn" onClick={handleClick} style={{position: "fixed", bottom: "10%", right: "2%", cursor: "pointer", zIndex: 100}}>{lang}</button>
            }      
        </div>
    )
}

export default BackToTop