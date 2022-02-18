const EditContact = () => {
  return (
    <>
      <div className="row">
        <h4>Contact</h4>
      </div>
      <div className="row">
        <div className="col-3">
          <p>Email Address</p>
        </div>
        <div className="col-6">
          <p>frankydesu@gmail.com</p>
        </div>
        <div className="col-3">
          <p className="blue-font-link">change</p>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <p>Mobile</p>
        </div>
        <div className="col-6">
          <p>065-505-1141</p>
          <button className="mybutton mt-4 px-4">Save Changes</button>
        </div>
        <div className="col-3">
          <p className="blue-font-link">change</p>
        </div>
      </div>
    </>
  );
};

export default EditContact;
