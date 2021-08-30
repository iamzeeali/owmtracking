import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth: { username, user } }) => {
  return (
    <div className='container' style={{ paddingTop: "130px" }}>
      <div className='card p-4 border'>
        <div className='row'>
          <div className='col-sm-6'>
            <h5>Welcome! {username && username} </h5>
            <img src='./dash.png' alt='inventory' width='90%' />
          </div>
          <div className='col-sm-6'>
            <p>
              OWM Logistics, an ISO 9001-2008 certified company and it is among
              the India’s leading and fastest growing complete supply chain
              solutions and services provider. Mostly, our customers called us
              One-Stop-Shop for logistics and supply chain solutions and
              services. As we provide innovate, customized supply chain and
              third-party logistics solutions by engaging industry best
              consultants, experts and by making best utilization of
              technologies and practices.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
