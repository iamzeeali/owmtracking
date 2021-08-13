import React, { useState, useEffect } from "react";
import Input from "./ui/Input";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCustomer, getCustomers } from "../_actions/customerAction";
import Spinner from "./ui/Spinner";
import FilterCustomer from "./FilterCustomer";

const Customer = ({
  addCustomer,
  getCustomers,
  history,
  loading,
  filtered,
  customers,
}) => {
  useEffect(() => {
    getCustomers();
  }, []);

  const [formData, setFormData] = useState({
    cCode: "",
    name: "",
    address: "",
    contactPerson: "",
    email: "",
    phone: "",
    type: "",
  });

  const { cCode, name, address, contactPerson, email, phone, type } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addCustomer(formData, history);
    getCustomers();
  };

  return (
    <div className='container'>
      <form
        className='card p-3 border animated fadeIn'
        onSubmit={(e) => onSubmitHandler(e)}
      >
        <h6 className='mb-2'>Add Customer</h6>

        <div className='row'>
          <div className='col-sm-5'>
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Customer Code'
                required='true'
                name='cCode'
                value={cCode}
                onChange={(e) => onChangeHandler(e)}
                autoFocus='true'
              />
            </div>
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Customer'
                required='true'
                name='name'
                value={name}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>{" "}
            <div className='form-group'>
              <textarea
                name=''
                className='form-control'
                placeholder='Address'
                required='true'
                name='address'
                value={address}
                rows='4'
                onChange={(e) => onChangeHandler(e)}
              ></textarea>
            </div>
          </div>
          <div className='col-sm-2'></div>

          <div className='col-sm-5'>
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Contact Person'
                name='contactPerson'
                value={contactPerson}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>{" "}
            <div className='form-group'>
              <Input
                className='form-control '
                placeholder='Phone'
                type='number'
                name='phone'
                value={phone}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className='form-group'>
              <select
                name='type'
                className='form-control '
                placeholder='Phone'
                value={type}
                onChange={(e) => onChangeHandler(e)}
              >
                <option value='customer'>Customer</option>
                <option value='sub-customer'>Sub-Customer</option>
              </select>
            </div>
          </div>
          <Input
            type='submit'
            value='Save'
            className='btn btn-danger btn-block mx-3'
          />
        </div>
      </form>

      <div className='customer my-5 card p-3 border animated fadeIn'>
        <FilterCustomer />
        <Link className='btn btn-danger col-sm-2 mb-2' to='/add-user'>
          Create User
        </Link>
        {customers !== null && !loading ? (
          <table className='table table-hover table-striped table-responsive-md'>
            <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
              <tr>
                <th scope='col'>C.Code</th>
                <th scope='col'>Customer</th>
                <th scope='col'>Address</th>
                <th scope='col'>Contact Person</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Email</th>
                <th scope='col'>Type</th>
              </tr>
            </thead>

            <tbody>
              {filtered !== null
                ? filtered.map((fl) => (
                    <tr key={fl._id}>
                      <td>{fl.cCode}</td>
                      <td>{fl.name}</td>
                      <td>{fl.address}</td>
                      <td>{fl.contactPerson}</td>
                      <td>{fl.email}</td>
                      <td>{fl.phone}</td>
                      <td>{fl.type}</td>
                    </tr>
                  ))
                : customers &&
                  customers.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.cCode}</td>
                      <td>{customer.name}</td>
                      <td>{customer.address}</td>
                      <td>{customer.contactPerson}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.email}</td>
                      <td>{customer.type}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

Customer.propTypes = {
  addCustomer: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  customers: state.customer.customers,
  loading: state.customer.loading,
  filtered: state.customer.filtered,
});

export default connect(mapStatetoProps, {
  addCustomer,
  getCustomers,
  FilterCustomer,
})(withRouter(Customer));
