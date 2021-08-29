import './HistoryBlock.css';

import { AccountBlock } from './AccountBlock' ;

import { IoMdSwap } from 'react-icons/io';

export default function HistoryBlock(props:any) {
    const { data , index} = props;
    return (
        <AccountBlock paddingLeft="10px" paddingRight="10px" paddingBottom="10px" paddingTop="10px">
            <div className="historyblock">
                <div className="myItem">
                    <h5>{data.my_item}</h5>
                    <p>Me</p>
                </div>
                <div className="swap-icon">
                    <IoMdSwap />
                </div>
                <div className="tradeItem">
                    <h5>{data.trader_item}</h5>
                    <p>{data.trader}</p>
                </div>
            </div>
        </AccountBlock>
    );
}