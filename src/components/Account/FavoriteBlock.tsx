import './FavoriteBlock.css';

import { AccountBlock } from './AccountBlock' ;

import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function FavoriteBlock(props:any) {
    const { data , index} = props;

    const dataTag = data.tag.map((dataTag:any) => 
        <p className="tag">{dataTag}</p>
    );

    return (
        <AccountBlock padding="10px">
            <div className="block-item-favorite">
                <div className="rowling">
                    <div className="column-img">
                        <img src={data.image} />
                    </div>
                    <div className="column-data">
                        <h5>{data.name}</h5>
                        <p>require : </p>
                        {dataTag}
                    </div>
                    <div className="deleteFavorite">
                        <AiOutlineCloseCircle />
                    </div>
                    
                </div>

            </div>
        </AccountBlock>
    );
}