import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Track = () => {
  const history = useHistory();

  const [ecci, setEcci] = useState("");
  const [notFoundInAsn, setNotFoundInAsn] = useState(false);
  const [notFoundInGrn, setNotFoundInGrn] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/api/asn?ecciNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInAsn(true);
        } else {
          history.push(`/trackStatus/${ecci}`);
        }
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        setNotFoundInAsn(true);
      });

    axios
      .get(`http://localhost:5000/api/grn/?ecciNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInGrn(true);
        } else {
          history.push(`/trackStatus/${ecci}`);
        }
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        setNotFoundInGrn(true);
      });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      onSubmitHandler(e);
    }
  };

  return (
    <div className='tack-main text-right'>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-sm-3 col-md-offset-6'></div>
          <div className='col-sm-6 col-md-offset-6'>
            <div className='row no-gutters align-items-center'>
              <img
                src='/sun.gif'
                alt='track'
                width='80%'
                className='ml-auto mr-auto '
                style={{ marginTop: "-40px" }}
              />

              <input
                className='form-control mb-2 mt-4 rounded-pill p-4'
                placeholder='ECCI Number'
                style={{}}
                autoFocus
                required
                type='Number'
                value={ecci}
                onChange={(e) => setEcci(e.target.value)}
                onKeyPress={(e) => handleKeypress(e)}
              />
              <div className='col-auto'>
                <button
                  onClick={(e) => onSubmitHandler(e)}
                  className='btn btn-outline-light bg-light text-dark border-0 rounded-pill ml-n5 mr-2'
                  style={{ marginTop: "18px" }}
                >
                  <i className='fa fa-search'></i>
                </button>
              </div>
              <br />
              <br />
              <p
                className='text-primary ml-auto mr-auto'
                style={{ fontSize: "11px" }}
              >
                Enter the ECCI number & press Enter to start tracking your
                shipment.
              </p>
            </div>

            {notFoundInAsn && notFoundInGrn ? (
              <div className='text-center animated bounceIn'>
                <br />{" "}
                <p
                  className='ml-auto mr-auto text-danger'
                  style={{ fontSize: "18px" }}
                >
                  {" "}
                  <i className='fa fa-frown-o text-danger font-weight-bold'>
                    {" "}
                    ECCI NOT FOUND
                  </i>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className='col-sm-3 col-md-offset-6'></div>
        </div>
      </div>

      <div className='footer  mt-5 pt-5 pr-5'>
        <p
          style={{ fontSize: "13px", marginTop: "25px" }}
          className='text-secondary'
        >
          &copy; 2021, OWM Logistics | Developed By{" "}
          <a
            href='http://globuslabs.com'
            className='text-danger'
            target='_blank'
          >
            Globus Labs
          </a>{" "}
          (Official IT Partner of OWM Logistics)
        </p>
      </div>
    </div>
  );
};

export default Track;
