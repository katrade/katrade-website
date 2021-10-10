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

    const { getUserData , getSearch } = useAuthorization();

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
            var getSrch:any = await getSearch(params.quote)
            if (getSrch) {
                setSearchData(getSrch);
            }
            hide()
        }
        init();
    }, [])

    var found = 0;
    if(searchData){
        const rec_item = searchData.map((item:any, index:any) => {
            if (item.item.owner != account._id) {
                found += 1;
                return <Interest item={item.item} key={index} />;
            }
        });

        return (
            <Background>
                <Navbar image={account.profilePic} />
                <Block  height="800px" backgroundColor="#f7fafc" darkBackgroundColor="transparent">
                    <div className="my-4">
                        <H5 className="mb-3">Search "{params.quote}".</H5>
                        <div className="d-flex justify-content-between full-width">
                            <div className="d-flex justify-content-between flex-wrap">
                                {rec_item.slice(0, 50)}
                            </div>
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