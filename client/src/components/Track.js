import React from "react";

const Track = () => {
  return (
    <div className='container'>
      <div className='row my-4'>
        <div className='col-sm-6 animated fadeIn card p-5 border'>
          <div className='row'>
            <div className='col-sm-8'>
              <h6>
                {" "}
                <i className='fa fa-road'> </i> Tracking Details
              </h6>

              <small className='text-secondary'>
                Tracking No: <b>853632029</b>{" "}
              </small>
            </div>

            <div className='col-sm-'>
              <img
                src='http://www.owmlogistics.com/img/OWM_Final.png'
                alt='owm'
                width='90px'
              />
            </div>
          </div>

          <hr />

          <div className='step step0 pb-5'>
            <h6>
              {" "}
              <i class='fa fa-shopping-basket mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseZero'
                aria-expanded='false'
                aria-controls='collapseZero'
                style={{ color: "#045e84" }}
                className='font-weight-bold'
              >
                Out for Pickup
              </a>{" "}
              <i className='fa fa-sort-down'> </i>
            </h6>
            <div class='collapsepl-5' id='collapseZero'>
              <small className='pl-5'>2/11/2020- 09:34pm</small>
            </div>
          </div>

          <div className='step step1 pb-5'>
            <h6>
              {" "}
              <i class='fa fa-cube mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseOne'
                aria-expanded='false'
                aria-controls='collapseOne'
                style={{ color: "#045e84" }}
                className='font-weight-bold'
              >
                Picked Up
              </a>{" "}
              <i className='fa fa-sort-down'> </i>
            </h6>
            <div class='collapsepl-5' id='collapseOne'>
              <small className='pl-5'>2/11/2020- 09:34pm</small>
            </div>
          </div>

          <div className='step step2 pb-5'>
            <h6>
              {" "}
              <i class='fa fa-truck mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseTwo'
                aria-expanded='false'
                aria-controls='collapseTwo'
                style={{ color: "#045e84" }}
                className='font-weight-bold'
              >
                In-transit
              </a>{" "}
              <i className='fa fa-sort-down'> </i>
            </h6>
            <div class='collapsepl-5' id='collapseTwo'>
              <small className='pl-5 '>2/11/2020- 09:34pm</small>
            </div>
          </div>

          <div className='step step3 pb-5'>
            <h6>
              {" "}
              <i class='fa fa-motorcycle mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseThree'
                aria-expanded='false'
                aria-controls='collapseThree'
                style={{ color: "#045e84" }}
                className='font-weight-bold'
              >
                Out for delivery
              </a>{" "}
              <i className='fa fa-sort-down'> </i>
            </h6>
            <div class='collapsepl-5' id='collapseThree'>
              <small className='pl-5'>2/11/2020- 09:34pm</small>
            </div>
          </div>

          <div className='step step4'>
            <h6>
              {" "}
              <i class='fa fa-smile-o mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseFour'
                aria-expanded='false'
                aria-controls='collapseFour'
                style={{ color: "#045e84" }}
                className='font-weight-bold'
              >
                Delivered
              </a>{" "}
              <i className='fa fa-sort-down'> </i>
            </h6>
            <div class='collapsepl-5' id='collapseFour'>
              <small className='pl-5  '>2/11/2020- 09:34pm</small>
            </div>
          </div>
        </div>

        <div className='col-sm-6 py-5 animated fadeIn'>
          <img src='./track.png' alt='' width='100%' />
        </div>
      </div>

      <button
        class='fixed-button wobble'
        onclick='hello()'
        type='button'
        data-toggle='modal'
        data-target='#myModal'
      >
        Track <i class='fa fa-search text-light pl-2'> </i>
      </button>

      {/* MODAL */}

      <div class='modal fade' id='myModal'>
        <div class='modal-dialog modal-dialog-centered'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h4 class='modal-title'>Track By</h4>
              <button type='button' class='close' data-dismiss='modal'>
                &times;
              </button>
            </div>

            <div class='modal-body'>
              <div class='form-check-inline'>
                <label class='form-check-label' for='radio1'>
                  <input
                    type='radio'
                    class='form-check-input'
                    id='radio1'
                    name='optradio'
                    value='option1'
                    checked
                  />
                  Tracking Id
                </label>
              </div>
              <div class='form-check-inline'>
                <label class='form-check-label' for='radio2'>
                  <input
                    type='radio'
                    class='form-check-input'
                    id='radio2'
                    name='optradio'
                    value='option2'
                  />
                  Order No
                </label>
              </div>
              <div class='form-check-inline'>
                <label class='form-check-label'>
                  <input
                    type='radio'
                    class='form-check-input'
                    id='radio3'
                    name='optradio'
                    value='option3'
                  />
                  ECCI No
                </label>
              </div>

              <div class='form-check-inline'>
                <label class='form-check-label' for='radio2'>
                  <input
                    type='radio'
                    class='form-check-input'
                    id='radio4'
                    name='optradio'
                    value='option4'
                  />
                  Shipment No
                </label>
              </div>
            </div>

            <div className='form-group p-4'>
              <input type='text' className='form-control' />
            </div>

            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-primary'
                data-dismiss='modal'
              >
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
