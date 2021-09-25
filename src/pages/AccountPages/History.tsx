import MenuAccount from '../../templates/MenuAccount';

import './History.css';

import HistoryBlock from '../../components/Account/HistoryBlock';

export default function Account() {

    const historyData = [
        {
            name: "bon",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทย",
        },
        {
            name: "bon",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทย",
        },
        {
            name: "bon",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทย",
        },
        {
            name: "bon",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทย",
        },
        
    ]
    
    const history_data = historyData.map((data, index) => {
        return <HistoryBlock data={data} index={index}/>;
    });
    return (
        <>
            <MenuAccount>
                <div className="container-history">
                    <h4>History</h4>
                    <p>ยังไม่เสร็จเรียบร้อย รอหน่อยได้มั้ยละ?</p>
                    {history_data}
                </div>
            </MenuAccount>
        </>
    );
}