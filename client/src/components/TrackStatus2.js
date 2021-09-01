import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getForReceived,
  getForDdTransit,
  getForMrTransit,
} from "../_actions/grnAction";
import { getAsns } from "../_actions/asnAction";

const TrackStatus2 = ({
  match,
  loading,
  getForReceived,
  getForDdTransit,
  getForMrTransit,
  mrTransit,
  ddTransit,
  received,
  getAsns,
  asns,
  asnUploadDate,
  transDate,
  transDateForDirect,
}) => {
  const [state, setState] = useState({
    deliveryDate: "",
  });
  const { planDate, deliveryDate } = state;
  useEffect(() => {
    setState({ deliveryDate: "" });
    getAsns(match.params.id);
    getForReceived(match.params.id);
    getForDdTransit(match.params.id);
    getForMrTransit(match.params.id);

    console.log(asnUploadDate);
    // let asnUploadDateFromReport = asnUploadDate;
    // let planDDinString = asnUploadDateFromReport.slice(0, 2);

    // let planDDinNumber = parseInt(planDDinString) + 1;
    // if (planDDinNumber.toString().length > 1) {
    //   let asnUploadDatewithoutDD = asnUploadDateFromReport.substring(2);
    //   let planForPickDate = planDDinNumber.toString() + asnUploadDatewithoutDD;

    //   setState({ ...state, planDate: planForPickDate });
    // } else {
    //   let asnUploadDatewithoutDD = asnUploadDateFromReport.substring(2);
    //   let planForPickDate = "0" + planDDinNumber + asnUploadDatewithoutDD;
    //   setState({ ...state, planDate: planForPickDate && planForPickDate });
    // }

    // TRANS DATE ++
    let transDateFromReport = transDate !== "" ? transDate : transDateForDirect;
    let transDDinString = transDateFromReport.slice(0, 2);

    let transDDinNumber = parseInt(transDDinString) + 1;
    if (transDDinNumber.toString().length > 1) {
      let transDatewithoutDD = transDateFromReport.substring(2);
      let ddDate = transDDinNumber + "" + transDatewithoutDD;
      console.log(typeof ddDate);

      setState({ ...state, deliveryDate: ddDate.toString() });
    } else {
      let transDatewithoutDD = transDateFromReport.substring(2);
      let ddDate = "0" + transDDinNumber + transDatewithoutDD;
      console.log(typeof ddDate);

      setState({ ...state, deliveryDate: ddDate.toString() });
    }
  }, [asnUploadDate, transDate, transDateForDirect]);

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

  const planningDate = () => {
    var mydate = new Date(asnUploadDate);
    return mydate.toDateString();
  };

  return (
    <div className='status'>
      <div className='status-overlay'>
        <div className='status-inner'>
          <div className='container'>
            <div className='row pb-5'>
              <div className='col-sm-6 animated shadow-lg fadeIn bg-white mb-5 p-4 ml-auto mr-auto'>
                <div className='row'>
                  <div className='col-sm-8'>
                    <h4 style={{ color: "#045E84" }}>Tracking Status</h4>

                    <h6 style={{ color: "#045E84" }}>
                      {" "}
                      {/* <span style={{ fontWeight: "600" }}>Vendor: </span>{" "} */}
                      {vendor()}
                    </h6>

                    <h6 style={{ color: "#045E84" }}>
                      <span style={{ fontWeight: "600" }}>ECCI:</span> #
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

                <div className='step step0 pb-4 pt-1'>
                  {" "}
                  <i
                    className={`fa fa-tasks ${
                      asnUploadDate ? "text-primary" : "text-danger"
                    } mr-3 border p-1 `}
                  ></i>
                  Planned for Picking <br />
                  <small style={{ paddingLeft: "43px" }}>
                    {/* {asns.results > 0 && asns.data.data[0].asnUploadDate} */}

                    {asnUploadDate}
                  </small>
                </div>

                <div className='step step0 pb-4 pt-1'>
                  <i
                    className={`fa fa-shopping-basket ${
                      mrTransit.results > 0
                        ? "text-primary"
                        : ddTransit.results > 0
                        ? "text-primary"
                        : "text-danger"
                    } mr-3 border p-1 `}
                  ></i>
                  Picked
                  <br />
                  <small style={{ paddingLeft: "43px" }}>
                    {mrTransit.results > 0
                      ? mrTransit.data.data[0].inDate
                      : ddTransit.results > 0
                      ? ddTransit.data.data[0].inDate
                      : ""}
                    {/* {received.results > 0 && received.data.data[0].inDate} */}
                  </small>
                </div>

                {ddTransit.results > 0 ? null : (
                  <div className='step step1 pb-4 pt-1'>
                    <i
                      className={`fa fa-cube ${
                        received.results > 0 ? "text-primary" : "text-danger"
                      } mr-3 border p-1 `}
                    ></i>
                    Received
                    <br />
                    <small style={{ paddingLeft: "43px" }}>
                      {received.results > 0 && received.data.data[0].inDate}
                    </small>
                  </div>
                )}

                {ddTransit.results > 0 ? null : (
                  <div className='step step2 pb-4 pt-1'>
                    <i
                      className={`fa fa-truck ${
                        mrTransit.results > 0 ? "text-primary" : "text-danger"
                      } mr-3 border p-1 `}
                    ></i>
                    Dispatched{" "}
                    {/* {mrTransit.results > 0
                    ? mrTransit.data.data[0].modeOfDelivery
                    : ddTransit.results > 0
                    ? ddTransit.data.data[0].modeOfDelivery
                    : ""} */}
                    <br />
                    <small style={{ paddingLeft: "43px" }}>
                      {mrTransit.results > 0
                        ? mrTransit.data.data[0].transDate
                        : ""}
                    </small>
                  </div>
                )}

                <div className='step step1 pb-4 pt-1'>
                  <i
                    className={`fa fa-truck ${
                      deliveryDate !== "NaN" ? "text-primary" : "text-danger"
                    } mr-3 border p-1 `}
                  ></i>
                  Delivered
                  <br />
                  <small style={{ paddingLeft: "43px" }}>
                    {deliveryDate !== "NaN" ? deliveryDate : ""}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TrackStatus2.propTypes = {
  getForReceived: PropTypes.func.isRequired,
  getAsns: PropTypes.func.isRequired,
  getForDdTransit: PropTypes.func.isRequired,
  getForMrTransit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  received: state.grn.received,
  asns: state.asn.asns,
  loading: state.asn.loading,
  asnUploadDate: state.asn.asnUploadDate,
  transDate: state.grn.transDate,
  transDateForDirect: state.grn.transDateForDirect,
  mrTransit: state.grn.mrTransit,
  ddTransit: state.grn.ddTransit,
});
export default connect(mapStateToProps, {
  getForReceived,
  getAsns,
  getForDdTransit,
  getForMrTransit,
})(TrackStatus2);
