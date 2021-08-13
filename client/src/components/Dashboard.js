import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth: { username, user } }) => {
  return (
    <div className='container'>
      <div className='card p-5 border'>
        <div className='row'>
          <div className='col-sm-6'>
            <h5>Welcome! {username && username} </h5>
            <img src='./dash.png' alt='inventory' width='100%' />
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
            <p>
              We been getting multifarious opportunities from India and
              successfully serving India’s best-known and most successful
              companies, we have domain and industry specific experts in our
              team to uniquely serve companies from Steel manufacturing
              industry, automotive, energy, oil & gas, retail and
              pharmaceuticals. Our supply chain design, consulting, warehousing,
              fulfillment, and transportation services help companies to be more
              productive, more efficient and more competitive. In all cases, our
              customer is at the centre of everything we do from initial
              situation analysis to the continuous improvement programs that
              help deliver better results every day.
            </p>
          </div>
        </div>
        <small>
          Powered by <a href='http://globuslabs.com'>Globus Labs</a>, Jamshedpur{" "}
        </small>
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
