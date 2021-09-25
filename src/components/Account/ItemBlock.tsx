import useAuthorization from '../../hooks/useAuthorization';
import { useHistory } from "react-router";

import './ItemBlock.css'

import { AccountBlock } from './AccountBlock';

import { FaPen } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';

export default function ItemBlock(props: any) {
	const { data, index, manage } = props;
    const history = useHistory();
    const { deleteMyProduct } = useAuthorization();
	const dataTag = data.require.map((dataTag: any) => {
		return (
			<div className="d-flex mx-2 px-2 " style={{backgroundColor:"rgb(21, 199, 119)", borderRadius:"8px"}}>
				<p className="m-0 text-white">{dataTag.reqCat.parentCategoryEn} :</p>
				<p className="m-0 text-white">&nbsp;{dataTag.reqCat.childCategoryEn}</p>
			</div>
		);
	});

	function detailProduct(){
		history.push(`/app/product?product_id=${data._id}`);
	}

	function handleDelete(){
		if(window.confirm(`ต้องการลบ ${data.name} อีหลีถิ?`)){
			deleteMyProduct(data._id);
		}
	}
	return (
		<AccountBlock>
			<div className="d-flex flex-wrap position-relative" style={{width:"auto"}}>
				<div className="p-0" onClick={detailProduct} style={{cursor:"pointer"}}>
					<img src={data.pictures[0]} style={{width:"170px", height:"110px",borderRadius:"8px"}}/>
				</div>
				<div className="ps-3 text-start col-md-6" style={{borderRadius:"8px",cursor:"pointer"}} onClick={detailProduct}>
					<h5 className="mb-3">{data.name}</h5>
					<div className="d-flex flex-wrap">
						<p className="m-0">require : </p>
						{dataTag}
					</div>
				</div>
				<div className="position-absolute" style={{top:"0",right:"0"}}>
					<p className="m-0" onClick={handleDelete} style={{cursor:"pointer"}}>delete</p>
				</div>
			</div>
		</AccountBlock>
	);
}