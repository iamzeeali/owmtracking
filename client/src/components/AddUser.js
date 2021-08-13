import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomers } from "../_actions/customerAction";
import { addSecondUser, getUsers } from "../_actions/authAction";
import Spinner from "../components/ui/Spinner";

const Adduser = ({
  getCustomers,
  getUsers,
  addSecondUser,
  loading,
  customers,
  users,
}) => {
  useEffect(() => {
    getCustomers();
    getUsers();
    //eslint-diable-next-line
  }, []);

  const [formData, setFormData] = useState({
    customer: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "customer",
    message:
      "Please use these login credentials to track and find details about your inventory.",
  });

  const { customer, name, email, password, passwordConfirm, message } =
    formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addSecondUser(formData);
    getUsers();
  };

  let customersOptions =
    customers.data &&
    customers.data.map((customer) => (
      <option key={customer._id} value={customer._id}>
        {customer.name}
      </option>
    ));

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
          <form
            className='card p-3 border animated fadeIn'
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <h6 className='mb-2'>Create User</h6>
            {/* <div className='form-group'>
              {" "}
              <select
                className='form-control'
                name='customer'
                value={customer}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value='' disabled selected hidden>
                  Select customer
                </option>

                {customersOptions}
              </select>
            </div> */}
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Name'
                required='true'
                name='name'
                value={name}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>{" "}
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Email'
                name='email'
                value={email}
                type='email'
                onChange={(e) => onChangeHandler(e)}
                required='true'
              />
            </div>
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChangeHandler(e)}
                required='true'
              />
            </div>{" "}
            <div className='form-group'>
              {" "}
              <Input
                className='form-control'
                placeholder='Confirm Password'
                type='password'
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={(e) => onChangeHandler(e)}
                required='true'
              />
            </div>
            <div className='form-group'>
              {" "}
              <textarea
                className='form-control'
                placeholder='Message'
                type='text'
                name='message'
                value={message}
                onChange={(e) => onChangeHandler(e)}
                required='true'
                rows='4'
              ></textarea>
            </div>
            <Input
              type='submit'
              value='Save'
              className='btn btn-danger btn-block'
            />
          </form>
        </div>

        <div className='col-sm-8'>
          <div className='user card p-3 border animated fadeIn'>
            <h6 className='mb-2'>Users</h6>

            <table className='table table-hover table-striped table-responsive-md '>
              <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
                <tr>
                  <th scope='col'>User</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Customer</th>
                </tr>
              </thead>
              {users !== null && !loading ? (
                <tbody>
                  {users.map((usr) => (
                    <tr key={usr._id}>
                      <td>{usr.name && usr.name}</td>
                      <td>{usr.email && usr.email}</td>
                      <td>
                        {usr.customer ? (
                          usr.customer.name
                        ) : (
                          <span className='text-danger'>Admin</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <Spinner />
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Adduser.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  addSecondUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  customers: state.customer.customers,
  loading: state.customer.loading,
  users: state.auth.users.data,
});

export default connect(mapStatetoProps, {
  getCustomers,
  addSecondUser,
  getUsers,
})(withRouter(Adduser));
