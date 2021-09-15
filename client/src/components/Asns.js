import React, { useEffect, useState } from "react";
import { getLimitedAsns } from "../_actions/asnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterAsn from "./FilterAsns";
import Spinner from "./ui/Spinner";
import Moment from "react-moment";
import moment from "moment";

const Asns = ({ getLimitedAsns, asns, filtered, loading, asnUploadDate }) => {
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

  const [planDate, setPlanDate] = useState("");
  useEffect(() => {
    getLimitedAsns();

    //eslint-diable-next-line
  }, []);

  // const convertUploadDate = (str) => {
  //   console.log(typeof str);
  //   var date = new Date(str),
  //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   return [day, mnth, date.getFullYear()].join("-");
  // };

  function increasePlanDateBy1(s, manual) {
    if (!manual) {
      var d = moment(s).toDate();
      var increasePlanDate = new Date(d.setDate(d.getDate() + 1));

      return (
        <Moment format='DD-MMM-YYYY'>
          {increasePlanDate && increasePlanDate}
        </Moment>
      );
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='container-fluid' style={{ paddingTop: "130px" }}>
      <h5 className='bg-light p-2 border-left border-primary'>
        ASN Report (Uploaded in last 7 days)
      </h5>

      <FilterAsn />

      <div className='tableFixHead'>
        <table className='table table-hover table-striped table-responsive-md my-2'>
          <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
            <tr>
              <th scope='col'>ECCI</th>
              <th scope='col'>ASN Upload Date</th>
              <th scope='col'>Vendor Code</th>
              <th scope='col'>Vendor Name</th>
              <th scope='col'>Uploaded at</th>
            </tr>
          </thead>
          <tbody>
            {filtered !== null
              ? filtered.map((asn) => (
                  <tr key={asn._id}>
                    <td>{asn.ecciNumber && asn.ecciNumber}</td>
                    <td> {increasePlanDateBy1(asn.asnUploadDate)}</td>
                    <td>{asn.vendorCode && asn.vendorCode}</td>
                    <td>{asn.vendorName && asn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY hh:mm:ss a'>
                        {asn.date && asn.date}
                      </Moment>
                    </td>
                  </tr>
                ))
              : asns.data &&
                asns.data.data.map((asn) => (
                  <tr key={asn._id}>
                    <td>{asn.ecciNumber && asn.ecciNumber}</td>
                    <td>
                      {increasePlanDateBy1(asn.asnUploadDate, asn.manual)}
                    </td>
                    <td>{asn.vendorCode && asn.vendorCode}</td>
                    <td>{asn.vendorName && asn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY hh:mm:ss a'>
                        {asn.date && asn.date}
                      </Moment>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Asns.propTypes = {
  getLimitedAsns: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  asns: state.asn.asns,
  loading: state.asn.loading,
  filtered: state.asn.filtered,
  asnUploadDate: state.asn.asnUploadDate,
});

export default connect(mapStatetoProps, {
  getLimitedAsns,
})(Asns);
