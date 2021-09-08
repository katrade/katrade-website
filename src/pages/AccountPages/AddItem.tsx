import Block from '../../components/Block';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AddItem() {
    return (
        <div>
            <Navbar />
                <Block height="200px" backgroundColor="#f7fafc">
                    <div className="py-3 px-5 my-3 bg-white">
                        <h5>Add New Item</h5>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Item Name</label>
                            <div className="col-md-10">
                                <input type="email" className="form-control" id="inputName" placeholder="Enter your item name" />
                            </div>
                        </div>

                        <div className="mb-3" style={{height:"auto",backgroundColor:"#C4C4C4"}}>
                            <div className="row px-3 py-4">
                                <p className="col-12">Picture</p>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Category</label>
                            <div className="col-md-5">

                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} placeholder="Enter details."></textarea >
                            </div>
                        </div>



                        <p className="mb-0 mt-4 fw-bold">Requirement</p>
                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Require Category</label>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 col-form-label">Requirement Details</label>
                            <div className="col-md-10">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} placeholder="Enter requirement details"></textarea>
                            </div>
                        </div>
                    </div>
                </Block>
            <Footer />
        </div>
    );
}