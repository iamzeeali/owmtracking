import React, { useState } from "react";
import Input from "./ui/Input";
import { addManualGrn } from "../_actions/grnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AddGrn = ({ addManualGrn }) => {
  const [formData, setFormData] = useState({
    ecciNumber: "",
    transactionType: "",
    modeOfDelivery: "",
    vendorCode: "",
    vendorName: "",
    inDate: "",
    transDate: "",
  });

  const {
    ecciNumber,
    transactionType,
    modeOfDelivery,
    vendorCode,
    vendorName,
    inDate,
    transDate,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    addManualGrn(formData);
    document.getElementById("closeModal").click();
  };
  return (
    <div>
      <button
        type='button'
        className='btn btn-primary btn-block'
        data-toggle='modal'
        data-target='#grnModal'
      >
        Add Manually
      </button>

      <div
        className='modal fade'
        id='grnModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='grnModalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='grnModalLongTitle'>
                Add Stock Movement
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={(e) => onSubmitHandler(e)}>
                <Input
                  placeholder='ECCI Number'
                  className='form-control'
                  type='number'
                  name='ecciNumber'
                  value={ecciNumber}
                  required={true}
                  autoFocus={true}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  placeholder='Transaction Type'
                  className='form-control'
                  type='text'
                  name='transactionType'
                  value={transactionType}
                  required={true}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  placeholder='Mode Of Delivery'
                  className='form-control'
                  type='text'
                  name='modeOfDelivery'
                  value={modeOfDelivery}
                  required={true}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  placeholder='Vendor Code'
                  className='form-control'
                  type='text'
                  name='vendorCode'
                  value={vendorCode}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  placeholder='Vendor Name'
                  className='form-control'
                  type='text'
                  name='vendorName'
                  value={vendorName}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <label for='basic-url' className='form-label'>
                  In Date
                </label>
                <Input
                  placeholder='In Date'
                  className='form-control'
                  type='date'
                  name='inDate'
                  value={inDate}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <label for='basic-url' className='form-label'>
                  Trans Date
                </label>
                <Input
                  placeholder='Trans Date'
                  className='form-control'
                  type='date'
                  name='transDate'
                  value={transDate}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <div class='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                    aria-label='Close'
                    id='closeModal'
                  >
                    Close
                  </button>
                  <button type='submit' class='btn btn-primary'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddGrn.propTypes = {
  addManualGrn: PropTypes.func.isRequired,
};

export default connect(null, {
  addManualGrn,
})(AddGrn);
