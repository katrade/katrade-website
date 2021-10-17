import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Interest from '../components/Interest';
import Block from '../components/Block';
import useLoading from '../hooks/useLoading';
import Background from '../components/Background';
import { H4, H5 } from '../components/standard/H';
// const queryString = require("query-string");

// function getRandomInt(max: number) {
//     return Math.floor(Math.random() * max);
// }
interface IParams {
    quote: string;
}
export default function Search() {

    // const { search } = useLocation();
    // const { searchword } = queryString.parse(search);

    const { getUserData , getSearch , searchByCategory } = useAuthorization();

    const [ searchQuote , setSearchQuote] = useState<string|null>('')
    const [ account , setAccount] = useState<any>();
    const [ searchData , setSearchData ] = useState<any>();
    const [show, hide] = useLoading();
    const params: IParams = useParams();
    useEffect(() => {
        async function init() {
            show()
            var userData = await getUserData();
            if (userData) {
                setAccount(userData);
            }
            if (params.quote.split("-")[params.quote.split("-").length - 1] == "byCategory") {
                var getSrch:any = await searchByCategory(params.quote.split("-")[0], params.quote.split("-")[1]);
                if (getSrch){
                    setSearchData(getSrch);
                }
            }else{
                var getSrch:any = await getSearch(params.quote.split("-").slice(0, -1).join(""));
                if (getSrch){
                    setSearchData(getSrch);
                }
            }
            hide()
        }
        init();
    }, [])

    // console.log(params.quote.split("-")[0], params.quote.split("-")[1])

    var found = 0;
    if(searchData && params.quote.split("-")[params.quote.split("-").length - 1] == "byText"){
        const rec_item = searchData.map((item:any, index:any) => {
            if (item.item == undefined){
                window.location.reload();
            }else if (item.item.owner != account._id) {
                found += 1;
                return <Interest item={item.item} key={index} />;
            }
        });
        // console.log(rec_item)

        return (
            <Background>
                <Navbar image={account.profilePic} />
                <Block  height="800px" backgroundColor="#f7fafc" darkBackgroundColor="transparent">
                    <div className="my-4">
                        <H5 className="mb-3">Search "{params.quote.split("-").slice(0, -1).join("")}".</H5>
                            <div className="d-flex flex-wrap">
                                {rec_item.slice(0, 50)}
                            </div>
                        <div className={found == 0 ? "d-flex justify-content-center align-items-center my-5" : "d-none"} style={{height:"300px", backgroundColor:"transparent"}}>
                                <H4 className="text-center">ไม่พบสิ่งของที่คุณค้นหา</H4>
                        </div>
                    </div>
                </Block>

                <Footer />
            </Background>
        );

    }else if(searchData && params.quote.split("-")[params.quote.split("-").length - 1] == "byCategory"){
        const rec_item = searchData.map((item:any, index:any) => {
            if(item.owner == undefined){
                window.location.reload();
            }else if (item.owner != account._id) {
                found += 1;
                return <Interest item={item} key={index} />;
            }
        });

        return (
            <Background>
                <Navbar image={account.profilePic} />
                <Block  height="800px" backgroundColor="#f7fafc" darkBackgroundColor="transparent">
                    <div className="my-4">
                        <H5 className="mb-3">Search "{params.quote.split("-").slice(0, -1)[1] == "none" ? params.quote.split("-").slice(0, -1)[0] : params.quote.split("-").slice(0, -1).join(": ")}".</H5>
                        {/* <H5 className="mb-3">Search "{params.quote.split("-").slice(0, -1).join(": ")}".</H5> */}
                            <div className="d-flex flex-wrap">
                                {rec_item.slice(0, 50)}
                            </div>
                        <div className={found == 0 ? "d-flex justify-content-center align-items-center my-5" : "d-none"} style={{height:"300px", backgroundColor:"transparent"}}>
                                <H4 className="text-center">ไม่พบสิ่งของที่คุณค้นหา</H4>
                        </div>
                    </div>
                </Block>

                <Footer />
            </Background>
        );
    
    }else{
        return (
            <div>
                <H5>ระเบิดเวลาาา ARRRRRRRRRRRRRRRRRR</H5>
            </div>
        );
    }

}