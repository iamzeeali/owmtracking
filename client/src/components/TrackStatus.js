import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getForReceived,
  getForDdTransit,
  getForMrTransit,
} from "../_actions/grnAction";
import { getAsns } from "../_actions/asnAction";

const TrackStatus = ({
  match,
  getForReceived,
  getForDdTransit,
  getForMrTransit,
  mrTransit,
  ddTransit,
  received,
  getAsns,
  asns,
}) => {
  useEffect(() => {
    getAsns(match.params.id);
    getForReceived(match.params.id);
    getForDdTransit(match.params.id);
    getForMrTransit(match.params.id);
  }, []);

  const vendor = () => {
    if (asns.results > 0) {
      return asns.data.data[0].vendorName;
    } else if (received.results > 0) {
      return received.data.data[0].vendorName;
    } else if (mrTransit.results > 0) {
      return mrTransit.data.data[0].vendorName;
    } else if (ddTransit.results > 0) {
      return ddTransit.data.data[0].vendorName;
    } else {
      return null;
    }
  };
  return (
    <div className='status'>
      <div className='status-overlay'>
        <div className='status-inner'>
          <div className='container'>
            <div className='row py-4'>
              <div className='col-sm-6 animated fadeIn card p-5 ml-auto mr-auto'>
                <div className='row'>
                  <div className='col-sm-8'>
                    <h3 style={{ color: "#045E84" }}>Tracking Status</h3>

                    <h6 style={{ color: "#045E84" }}>
                      {" "}
                      <span style={{ fontWeight: "600" }}>Vendor: </span>{" "}
                      {vendor()}
                    </h6>

                    <h6 style={{ color: "#045E84" }}>
                      <span style={{ fontWeight: "600" }}>ECCI No:</span> #
                      {match.params.id}
                    </h6>

                    <h6 style={{ color: "#045E84" }}>
                      <span style={{ fontWeight: "600" }}>
                        {ddTransit.results > 0 &&
                          ddTransit.data.data[0].modeOfDelivery}
                      </span>
                    </h6>
                  </div>

                  <div className='col-sm-4 text-right'>
                    <img src='/truck.gif' alt='owm' width='100px' />
                  </div>
                </div>

                <hr />

                <div className='step step0 pb-3 pt-1'>
                  <p>
                    {" "}
                    <i class='fa fa-shopping-basket text-primary mr-3 border p-1 '></i>
                    <a
                      data-toggle='collapse'
                      href='#collapseZero'
                      aria-expanded='false'
                      aria-controls='collapseZero'
                      style={{
                        color:
                          asns && asns.results >= 1 ? "#faab19" : "#c2c2c2",
                      }}
                    >
                      Planned for Picking
                    </a>{" "}
                  </p>
                  <div class='' id='collapseZero'>
                    <small style={{ paddingLeft: "38px" }}>
                      {asns.results > 0 && asns.data.data[0].asnUploadDate}
                    </small>
                  </div>
                </div>

                <div className='step step0 pb-3 pt-1'>
                  <p>
                    {" "}
                    <i class='fa fa-shopping-basket mr-3  text-primary border c p-1 '></i>
                    <a
                      data-toggle='collapse'
                      href='#collapseZero'
                      aria-expanded='false'
                      aria-controls='collapseZero'
                      style={{
                        color:
                          asns && asns.results >= 1 ? "#faab19" : "#c2c2c2",
                      }}
                    >
                      Picked
                    </a>{" "}
                  </p>
                  <div class='' id='collapseZero'>
                    <small style={{ paddingLeft: "38px" }}>
                      {asns.results > 0 && asns.data.data[0].asnUploadDate}
                    </small>
                  </div>
                </div>

                {ddTransit.results > 0 &&
                ddTransit.data.data[0].modeOfDelivery === "DIRECT DELIVERY" ? (
                  ""
                ) : (
                  <div className='step step1 pb-3'>
                    <p>
                      {" "}
                      <i class='fa fa-cube mr-3 text-primary border p-1 '></i>
                      <a
                        data-toggle='collapse'
                        href='#collapseOne'
                        aria-expanded='false'
                        aria-controls='collapseOne'
                        style={{
                          color:
                            received && received.results >= 1
                              ? "#faab19"
                              : "#c2c2c2",
                        }}
                      >
                        Received
                      </a>{" "}
                    </p>
                    <div class='' id='collapseOne'>
                      <small style={{ paddingLeft: "38px" }}>
                        {received.results > 0 && received.data.data[0].inDate}
                      </small>
                    </div>
                  </div>
                )}

                <div className='step step2'>
                  <p>
                    {" "}
                    <i class='fa fa-truck mr-3 text-primary border p-1 '></i>
                    <a
                      data-toggle='collapse'
                      href='#collapseTwo'
                      aria-expanded='false'
                      aria-controls='collapseTwo'
                      style={{
                        color:
                          mrTransit && mrTransit.results >= 1
                            ? "#faab19"
                            : ddTransit && ddTransit.results >= 1
                            ? "#faab19"
                            : "#c2c2c2",
                      }}
                    >
                      Dispatched{" "}
                      {mrTransit.results > 0
                        ? mrTransit.data.data[0].modeOfDelivery
                        : ddTransit.results > 0
                        ? ddTransit.data.data[0].modeOfDelivery
                        : ""}
                    </a>{" "}
                  </p>
                  <div class='' id='collapseTwo'>
                    <small className='pl-5 '>
                      {mrTransit.results > 0
                        ? mrTransit.data.data[0].transDate
                        : ddTransit.results > 0
                        ? ddTransit.data.data[0].transDate
                        : ""}
                    </small>
                  </div>
                </div>

                <div className='step step1 pb-3'>
                  <p>
                    {" "}
                    <i class='fa fa-cube mr-3 text-primary border p-1 '></i>
                    <a
                      data-toggle='collapse'
                      href='#collapseOne'
                      aria-expanded='false'
                      aria-controls='collapseOne'
                      style={{
                        color:
                          received && received.results >= 1
                            ? "#faab19"
                            : "#c2c2c2",
                      }}
                    >
                      Delivered
                    </a>{" "}
                  </p>
                  <div class='' id='collapseOne'>
                    <small style={{ paddingLeft: "38px" }}>
                      {received.results > 0 && received.data.data[0].inDate}
                    </small>
                  </div>
                </div>

                {/* <div className='step step4'>
            <h6>
              {" "}
              <i class='fa fa-smile-o mr-3 border p-1 '></i>
              <a
                data-toggle='collapse'
                href='#collapseFour'
                aria-expanded='false'
                aria-controls='collapseFour'
                style={{ color: "#045e84" }}
                className='lead '
              >
                Delivered
              </a>{" "}
              
            </h6>
            <div class='collapse' id='collapseFour'>
              <small style={{ paddingLeft: "38px" }}>2/11/2020- 09:34pm</small>
            </div>
          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TrackStatus.propTypes = {
  getForReceived: PropTypes.func.isRequired,
  getAsns: PropTypes.func.isRequired,
  getForDdTransit: PropTypes.func.isRequired,
  getForMrTransit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  received: state.grn.received,
  asns: state.asn.asns,
  mrTransit: state.grn.mrTransit,
  ddTransit: state.grn.ddTransit,
});
export default connect(mapStateToProps, {
  getForReceived,
  getAsns,
  getForDdTransit,
  getForMrTransit,
})(TrackStatus);
