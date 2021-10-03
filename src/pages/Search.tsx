import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import useAuthorization from '../hooks/useAuthorization';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Interest from '../components/Interest';
import Block from '../components/Block';
const queryString = require("query-string");

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
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
    const params: IParams = useParams();

    useEffect(() => {
        async function init() {
            var userData = await getUserData();
            if (userData) {
                setAccount(userData);
            }
            var getSrch:any = await getSearch(params.quote)
            if (getSrch) {
                setSearchData(getSrch);
            }
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
            <div>
                <Navbar image={account.profilePic} />
                <Block  height="800px" backgroundColor="#f7fafc">
                    <div className="my-4">
                        <h5 className="mb-3">Search "{params.quote}".</h5>
                        <div className="d-flex justify-content-between full-width">
                            <div className="d-flex justify-content-between flex-wrap">
                                {rec_item.slice(0, 50)}
                            </div>
                        </div>
                        <div className={found == 0 ? "d-flex justify-content-center align-items-center my-5" : "d-none"} style={{height:"300px", backgroundColor:"#c7c7c7"}}>
                                <h4 className="text-center">ไม่พบสิ่งของที่คุณค้นหา</h4>
                        </div>
                    </div>
                </Block>

                <Footer />
            </div>
        );
    }else{
        return (
            <div>
                <h5>ระเบิด</h5>
            </div>
        );
    }

}