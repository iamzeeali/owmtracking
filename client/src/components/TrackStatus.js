import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getForReceived,
  getForDdTransit,
  getForMrTransit,
} from "../_actions/grnAction";
import { getAsns } from "../_actions/asnAction";
import Moment from "react-moment";

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
  asnUploadDate,
  transDate,
  transDateForDirect,
  transDateForReceive,
}) => {
  var newDate = new Date();

  Date.prototype.toShortFormat = function () {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = this.getDate();

    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];

    let year = this.getFullYear();

    return `${day}-${monthName}-${year}`;
  };

  const operateDeliveryDate = (tDate) => {
    var months = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    var p = tDate.split("-");
    return new Date(p[2], months[(p[1] || "").toLowerCase()], p[0]);
  };

  const [state, setState] = useState({
    deliveryDate: "",
    currentDate: newDate.toShortFormat(),
    dispatchDate: "07-Sep-2021",
    dispatchGreaterCurrent: false,
  });

  const [planDate, setPlanDate] = useState();

  const { deliveryDate } = state;

  function parseDate(s) {
    var months = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    var p = s.split("-");
    return new Date(p[2], months[(p[1] || "").toLowerCase()], p[0]);
  }

  Date.prototype.toShortFormat = function () {
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = this.getDate();

    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];

    let year = this.getFullYear();

    return `${day}-${monthName}-${year}`;
  };

  useEffect(() => {
    // let planningDate = parseDate(asnUploadDate);
    // setState({ ...state, asnUploadDate: planningDate });
    console.log(asnUploadDate);
    var asnUplaodDateIntoJSDate = operateDeliveryDate(asnUploadDate);
    console.log(asnUplaodDateIntoJSDate);

    var increasePlanDate = new Date(
      asnUplaodDateIntoJSDate.setDate(asnUplaodDateIntoJSDate.getDate() + 1)
    );

    console.log("dfd");
    setPlanDate(increasePlanDate);

    if (mrTransit.results > 0) {
      if (mrTransit.data.data[0].transDate) {
        let dispatchDate = mrTransit.data.data[0].transDate;
        setState({
          ...state,
          dispatchDate: dispatchDate,
        });
      }
    } else if (received.results > 0) {
      if (received.data.data[0].transDate) {
        let dispatchDate = received.data.data[0].transDate;
        setState({
          ...state,
          dispatchDate: dispatchDate,
        });
      }
    }
  }, []);

  useEffect(() => {
    getAsns(match.params.id);
    getForReceived(match.params.id);
    getForDdTransit(match.params.id);
    getForMrTransit(match.params.id);

    var transDateFromReport;
    if (transDate) {
      transDateFromReport = transDate;
    } else if (transDateForReceive) {
      transDateFromReport = transDateForReceive;
    } else {
      transDateFromReport = transDateForDirect;
    }
    var transDateIntoJSDate = operateDeliveryDate(transDateFromReport);
    var transDay = transDateIntoJSDate.getDay();

    if (transDay === 6) {
      var increasedDateBy1 = new Date(
        transDateIntoJSDate.setDate(transDateIntoJSDate.getDate() + 2)
      );

      if (increasedDateBy1 < state.currentDate) {
        console.log(increasedDateBy1 < state.currentDate);
        setState({ delDateGreaterThanCurrentDate: true });
      }

      var finalDeliveryDate = increasedDateBy1.toShortFormat();

      const firstPart = finalDeliveryDate.split("-")[0];

      if (firstPart.length > 1) {
        setState({ ...state, deliveryDate: finalDeliveryDate });
      } else {
        setState({ ...state, deliveryDate: "0" + finalDeliveryDate });
      }
    } else {
      var increasedDateBy2 = new Date(
        transDateIntoJSDate.setDate(transDateIntoJSDate.getDate() + 1)
      );

      var finalDeliveryDate2 = increasedDateBy2.toShortFormat();
      const firstPart2 = finalDeliveryDate2.split("-")[0];

      if (firstPart2.length > 1) {
        setState({ ...state, deliveryDate: finalDeliveryDate2 });
      } else {
        setState({ ...state, deliveryDate: "0" + finalDeliveryDate2 });
      }
    }

    //
  }, [asnUploadDate, transDate, transDateForDirect, transDateForReceive]);

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

  // console.log(state.delDateInJs);

  function planFn(asnUploadDate) {}

  return (
    <div className='status'>
      <div className='status-overlay'>
        <div className='status-inner'>
          <div className='container'>
            <div className='row  pb-5'>
              <div className='col-sm-6 animated shadow-lg fadeIn bg-white mb-5 p-4 ml-auto mr-auto'>
                <div className='row'>
                  <div className='col-sm-8'>
                    <h4 style={{ color: "#045E84" }}>Tracking Status </h4>

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
                    className={`fa fa-map ${
                      asnUploadDate ? "text-primary" : "text-danger"
                    } mr-3 border p-1 `}
                  ></i>
                  Planned for Picking <br />
                  <small style={{ paddingLeft: "43px" }}>
                    {/* {asns.results > 0 && asns.data.data[0].asnUploadDate} */}

                    <Moment format='DD-MMM-YYYY'>{planDate && planDate}</Moment>
                  </small>
                </div>

                <div className='step step0 pb-4 pt-1'>
                  <i
                    className={`fa fa-shopping-basket ${
                      mrTransit.results > 0
                        ? "text-primary"
                        : received.results > 0
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
                      : received.results > 0
                      ? received.data.data[0].inDate
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
                        mrTransit.results > 0
                          ? "text-primary"
                          : received.results > 0
                          ? "text-primary"
                          : "text-danger"
                      } mr-3 border p-1 `}
                    ></i>
                    Received
                    <br />
                    <small style={{ paddingLeft: "43px" }}>
                      {mrTransit.results > 0
                        ? mrTransit.data.data[0].inDate
                        : received.results > 0
                        ? received.data.data[0].inDate
                        : ""}
                    </small>
                  </div>
                )}

                {ddTransit.results > 0 ? null : (
                  <div className='step step2 pb-4 pt-1'>
                    <i
                      className={`fa fa-truck ${
                        mrTransit.results > 0
                          ? "text-primary"
                          : received.results > 0
                          ? "text-primary"
                          : "text-danger"
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
                        : received.results > 0
                        ? received.data.data[0].transDate
                        : ""}
                    </small>
                  </div>
                )}

                <div className='step step1 pb-4 pt-1'>
                  <i
                    className={`fa fa-dropbox ${
                      asnUploadDate || state.dispatchDate >= state.currentDate
                        ? "text-danger"
                        : "text-primary"
                    } mr-3 border p-1 `}
                  ></i>
                  {state.dispatchDate >= state.currentDate
                    ? "Expected Delivery"
                    : "Delivered"}
                  <br />
                  {asnUploadDate ? (
                    <small style={{ paddingLeft: "43px" }}>
                      {deliveryDate !== "NaN-undefined-NaN" ? deliveryDate : ""}
                    </small>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to='/' className='fab'>
        <i className='fa fa-search my-fab'></i>
      </Link>
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
  loading: state.asn.loading,
  asnUploadDate: state.asn.asnUploadDate,
  transDate: state.grn.transDate,
  transDateForReceive: state.grn.transDateForReceive,
  transDateForDirect: state.grn.transDateForDirect,
  mrTransit: state.grn.mrTransit,
  ddTransit: state.grn.ddTransit,
});
export default connect(mapStateToProps, {
  getForReceived,
  getAsns,
  getForDdTransit,
  getForMrTransit,
})(TrackStatus);
