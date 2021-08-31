import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../_actions/authAction";

const Navbar = ({
  auth: { username, isAuthenticated, loading, role, user },
  logout,
}) => {
  const customerAuthLinks = (
    <nav
      className='navbar navbar-expand-lg fixed-top navbar-dark mb-5 py-2 px-5 '
      style={{ backgroundColor: "#045E84" }}
    >
      <a className='navbar-brand' href='#'>
        <img src='./logow.png' alt='owm' width='80px' />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'>
              <i className='fa fa-home'></i> Home{" "}
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' to='/inventory'>
              <i class='fa fa-cube '></i> View Inventory
            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link' to='/order'>
              <i class='fa fa-list'></i> Orders{" "}
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <i class='fa fa-map-marker '></i> Track{" "}
            </Link>
          </li>

          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <i class='fa fa-gear'></i> Settings
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link className='dropdown-item' to='/sub-customer'>
                Your Customers{" "}
              </Link>

              <div className='dropdown-divider'></div>
              <Link className='dropdown-item' to='/profile'>
                Profile
              </Link>
            </div>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' to='/report'>
              <i class='fa fa-line-chart'></i> Reports{" "}
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav '></ul>
      </div>
    </nav>
  );

  const authLinks = (
    <nav
      className='navbar navbar-expand-lg fixed-top navbar-dark'
      style={{ backgroundColor: "#045E84" }}
    >
      <a className='navbar-brand' href='#'>
        <img src='./logow.png' alt='owm' width='70px' />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          {/* <li className='nav-item active'>
            <Link className='nav-link' to='/'>
              <i className='fa fa-home'> </i> Home{" "}
              <span className='sr-only'>(current)</span>
            </Link>
          </li> */}
          {/* <li className='nav-item '>
            <Link className='nav-link' to='/customer'>
              <i className='fa fa-users'> </i> Customers{" "}
              <span className='sr-only'>(current)</span>
            </Link>
          </li> */}
          <li className='nav-item '>
            <Link className='nav-link active' to='/upload'>
              <i className='fa fa-list'> </i> ECCI{" "}
              <span className='sr-only'>(current)</span>
            </Link>
          </li>
          <li className='nav-item '>
            <Link className='nav-link active' to='/'>
              <i className='fa fa-search'> </i> Track{" "}
              <span className='sr-only'>(current)</span>
            </Link>
          </li>
          {/* <li className='nav-item '>
            <Link className='nav-link' to='/add-user'>
              <i className='fa fa-user'> </i> Users{" "}
              <span className='sr-only'>(current)</span>
            </Link>
          </li> */}
        </ul>
        <ul className='navbar-nav   '>
          <li className='nav-item active'>
            <Link to='/login' onClick={logout} className='nav-link'>
              <i className='fa fa-sign-out'> </i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className='navbar  navbar-expand-lg fixed-top navbar-dark'>
      <Link className='navbar-brand' to='/'>
        <img
          src='/logow.png'
          alt='owm'
          width='100px'
          style={{ float: "left" }}
        />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav'></ul>
        <ul className='navbar-nav ml-auto' style={{ textAlign: "right" }}>
          <li className='nav-item'>
            <Link className='nav-link active' to='/'>
              Track <span className='sr-only'>(current)</span>
            </Link>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link active'
              href='http://www.owmlogistics.com/'
              target='_blank'
            >
              About <span className='sr-only'>(current)</span>
            </a>
          </li>
          <li className='nav-item'>
            <Link className='nav-link active' to='/feedback'>
              Feedback <span className='sr-only'>(current)</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  return (
    <Fragment>
      {!loading && (
        <div>
          {isAuthenticated && role === "admin"
            ? authLinks
            : isAuthenticated && role === "customer"
            ? customerAuthLinks
            : guestLinks}
        </div>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
