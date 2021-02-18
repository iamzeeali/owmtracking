import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "./ui/Input";
import { updateMyPassword } from "../_actions/authAction";

const Profile = ({ auth: { username, user }, updateMyPassword }) => {
  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const { passwordCurrent, password, passwordConfirm } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    updateMyPassword(formData);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <>
      <div className='container my-4'>
        <div className='row'>
          <div className='col-sm-6'>
            <div
              className='card shadow-sm rounded p-4'
              style={{ height: "300px" }}
            >
              <h1 className='display-4'>{username && username}</h1>
              <h2 className='lead'> {user.customer && user.customer.name} </h2>
              <h2 className='lead'>
                {" "}
                {user.customer && user.customer.address}
              </h2>
              <p> {user.email && user.email}</p>
            </div>
          </div>

          <div className='col-sm-6'>
            <div
              className='card shadow-sm rounded p-3'
              style={{ height: "330px" }}
            >
              <p className='lead font-weight-bold'>Update Password</p>

              <form onSubmit={(e) => onSubmitHandler(e)}>
                <button
                  class='btn btn-secondary btn-sm mb-2'
                  type='button'
                  onClick={togglePasswordVisiblity}
                >
                  <i
                    class={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"}
                  ></i>
                </button>
                <div className='input-group'>
                  <Input
                    className='form-control'
                    placeholder='Current Password'
                    type={passwordShown ? "text" : "password"}
                    required='true'
                    name='passwordCurrent'
                    value={passwordCurrent}
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
                <br />
                <Input
                  className='form-control'
                  placeholder='New Password'
                  type={passwordShown ? "text" : "password"}
                  required='true'
                  name='password'
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  className='form-control'
                  placeholder='Confirm New Password'
                  type={passwordShown ? "text" : "password"}
                  required='true'
                  name='passwordConfirm'
                  value={passwordConfirm}
                  onChange={(e) => onChangeHandler(e)}
                />
                <br />
                <Input
                  className=' btn btn-primary btn-block'
                  placeholder='Current Password'
                  type='submit'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateMyPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateMyPassword })(Profile);
