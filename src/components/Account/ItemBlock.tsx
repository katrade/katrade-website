import './ItemBlock.css'

import { AccountBlock } from './AccountBlock';

import { FaPen } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export default function ItemBlock(props:any) {
    
    const { data , index , manage} = props;

    const dataTag = data.tag.map((dataTag:any) => 
        <p className="tag">{dataTag}</p>
    );

    console.log(manage.length);

    return (
        <AccountBlock padding="10px">
            <div className="block-item">
                <div className="row">
                    <div className="column-img">
                        <img src={data.image} />
                    </div>
                    <div className="column-data">
                        <h5>{data.name}</h5>
                        <p>require : </p>
                        {dataTag}
                    </div>
                    <div className={manage.length == 3 ? "column-tik" : "column-tik-hide"}>
                        <h6 className="pen"><FaPen /></h6>
                        <h6 className="bin"><RiDeleteBin2Fill /></h6>
                    </div>
                </div>
            </div>
        </AccountBlock>
    );
}