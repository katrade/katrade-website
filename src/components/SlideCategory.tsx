import { useHistory } from "react-router";

import './SlideCategory.css';

export default function SlideCategory() {

    const history = useHistory();

    const categorySlide = [
        {
            photo:"https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            name:"Man Clothes",    
        },
        {
            photo:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80",
            name:"Woman Clothes",    
        },
        {
            photo:"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
            name:"Textbook",    
        },
        {
            photo:"https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
            name:"Electronics",    
        },
        {
            photo:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1187&q=80",

            name:"Beauty",    
        },
        {
            photo:"https://images.unsplash.com/photo-1516487200032-8532cb603261?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",

            name:"Sporting Goods",    
        },
        {
            photo:"https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",

            name:"Stationery",    
        },
        {
            photo:"https://images.unsplash.com/photo-1609537007960-8c67037a2379?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",

            name:"Collectibles",    
        },
        {
            photo:"https://images.unsplash.com/photo-1617048931430-5eb626d81e71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2073&q=80",

            name:"Accessories",    
        },
        {
            photo:"https://images.unsplash.com/photo-1586777469064-00eca3156523?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",

            name:"Home&Garden",    
        },
    ]

    function searchBySlide(searchNav:any) {
        history.push(`/app/search/${searchNav+"-"+"none"+"-byCategory"}`);
    }

    const slide = categorySlide.map((data:any, index:any) => {
        if(index < 5){
            return (
                <div className="position-absolute overflow-hidden pointer" style={{top:"0",left:`${index*400}px`,width:"400px",height:"175px", zIndex:10}} onClick={() => searchBySlide(data.name)}>
                    <div className="zoom">
                        <img className="d-block" src={data.photo} style={{width:"400px",height:"175px"}}/>
                        <div style={{width:"300px",position:"absolute", top:"57.5px", left:"50px"}}><p className="text-center text-white fs-1" >{data.name}</p></div>
                    </div>
                </div>
            );  
        }else if(index >= 5){
            return (
                <div className="position-absolute overflow-hidden pointer" style={{top:"175px",left:`${(index-5)*400}px`,width:"400px",height:"175px", zIndex:10}} onClick={() => searchBySlide(data.name)}>
                    <div className="zoom">
                        <img className="d-block" src={data.photo} style={{width:"400px",height:"175px"}}/>
                        <div style={{width:"300px",position:"absolute", top:"57.5px", left:"50px"}}><p className="text-center text-white fs-1" >{data.name}</p></div>
                    </div>
                </div>
            );  
        }
    })
    
    return (
        <div style={{width:"100%", height:"350px", backgroundColor:"rgb(169, 216, 189)", zIndex:1, overflowY:"hidden"}}>
            <div className="position-relative " style={{width:"2000px", height:"350px"}}>
                {slide}
            </div>
        </div>
    );
}