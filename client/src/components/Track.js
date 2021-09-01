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
      .get(`/api/asn?ecciNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInAsn(true);
        } else {
          window.location.assign(`/trackStatus2/${ecci}`);
        }
      })
      .catch((error) => {
        console.log("Something went wrong!", error);
        setNotFoundInAsn(true);
      });

    axios
      .get(`/api/grn/?ecciNumber=${ecci}`)
      .then((response) => {
        if (response.data.results <= 0) {
          setNotFoundInGrn(true);
        } else {
          window.location.assign(`/trackStatus2/${ecci}`);
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
    <div className='track-main'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3 col-md-offset-6'></div>
          <div className='col-sm-6 col-md-offset-6'>
            <div className='row no-gutters mt-5 pt-5 align-items-center'>
              <img
                src='/sun.gif'
                alt='track'
                width='80%'
                className='ml-auto mr-auto  '
                style={{ marginTop: "-40px" }}
              />

              <input
                className='form-control mb-2 mt-4 rounded-pill p-4 shadow-lg border-dark'
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
                className='text-white ml-auto mr-auto'
                style={{ fontSize: "11px" }}
              >
                Enter the ECCI number & press Enter.
              </p>
            </div>

            {notFoundInAsn && notFoundInGrn ? (
              <div className='text-center animated bounceIn'>
                {" "}
                <p className='ml-auto mr-auto'>
                  {" "}
                  <i className='fa fa-frown-o text-dark lead font-weight-bold'>
                    {" "}
                    ECCI not found!
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

      <div className='footer'>
        <p style={{ fontSize: "13px" }} className='text-black'>
          &copy; 2021, OWM Logistics | Developed By{" "}
          <a href='http://globuslabs.com' className='text-dark' target='_blank'>
            Globus Labs
          </a>{" "}
          (Official IT Partner)
        </p>
      </div>
    </div>
  );
};

export default Track;
