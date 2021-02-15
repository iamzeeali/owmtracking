import React from "react";

const Inventory = () => {
  return (
    <>
      <div className='container my-4'>
        <div className='row my-4'>
          <div className='col-sm-5 animated fadeIn'>
            <div className='card p-4' style={{ minHeight: "270px" }}>
              <h5 className='font-weight-bold'>
                {" "}
                <i class='fa fa-cube text-warning'></i>&nbsp; Material Details
              </h5>
              <hr />
              <h6 className='font-weight-bold'>
                <i class='fa fa-list-alt  text-primary'></i> &nbsp;Total Items:
                1203
              </h6>
              <br />
              <h6 className='font-weight-bold'>
                {" "}
                <i class='fa fa-balance-scale text-success'></i> Total Weight:
                1809 KG
              </h6>
              <br />
              <h6 className='font-weight-bold'>
                <i class='fa fa-flask text-danger'></i> &nbsp;Total Volume: 1234
                CFT
              </h6>
            </div>
          </div>
          <div className='col-sm-2'></div>
          <br />
          <div className='col-sm-5 animated fadeIn'>
            <div className='card p-4' style={{ minHeight: "270px" }}>
              <h5 className='font-weight-bold'>
                {" "}
                <i className='fa fa-money text-warning'> </i> &nbsp;Total
                Inventory Value
              </h5>
              <hr />

              <p className=' text-primary' style={{ fontSize: "25px" }}>
                ₹1221203.90
              </p>
              <br />
              <h6 className='font-weight-bold'>
                {" "}
                <i className='fa fa-calendar text-primary'></i> &nbsp;
                Transaction In: 24/1/2021
              </h6>
              <br />
              <h6 className='font-weight-bold'>
                {" "}
                <i className='fa fa-calendar text-danger'></i> &nbsp;
                Transaction Out: 28/1/2021
              </h6>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-5'>
            <div className='input-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Search Item...'
              />
              <div className='input-group-append'>
                <span className='input-group-text'>
                  <i
                    className='fa fa-search text-dark'
                    aria-hidden='true'
                    onClick={() => alert("hello")}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className='col-sm-3'></div>

          <div className='col-sm-4'>
            <div className='download-section'>
              <button className='btn btn-primary '>
                Download Your Inventory List
              </button>

              <button className='btn btn-white px-2' title='Download as Excel'>
                <i className='fa fa-file-excel-o fa-2x  text-success '></i>
              </button>
              <button className='btn btn-white' title='Downlaod as PDF'>
                {" "}
                <i className='fa fa-file-pdf-o fa-2x  text-danger'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='inventory card p-3 border animated fadeIn'>
          <table className='table table-hover table-striped table-responsive-md'>
            <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Part No</th>
                <th>Serial No</th>
                <th>Model</th>
                <th>Make</th>
                <th>Qty</th>
                <th>Last Transaction In</th>
                <th>Last Transaction Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>I001</td>
                <td>UPS</td>
                <td>90101</td>
                <td>AB9092</td>
                <td>AB88</td>
                <td>TR</td>
                <td>100</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Inventory;
