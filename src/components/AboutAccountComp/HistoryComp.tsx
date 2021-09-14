import HistoryBlock from '../../components/Account/HistoryBlock';

export default function HistoryComp(data: any) {
    const accountData = data.data;
    const fakeData = [
        {
            name: "fakeData",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทียม",
        },
        {
            name: "fakeData",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทียม",
        },
        {
            name: "fakeData",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทียม",
        },
        {
            name: "fakeData",
            my_item: "หนังกะติ๊ก",
            trader: "dave",
            trader_item: "ข้าวหมูทอดกะเทียม",
        },
    ]

    const dataHistoryBlock = fakeData.map((data, index) => {
        return <HistoryBlock data={data} index={index}/>;
    });

    return (
        <div>
            <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                    <div>
                        <h4 className="mb-4">History</h4>
                    </div>
                    <div>
                        {dataHistoryBlock}
                    </div>
            </div>
        </div>
    );
}