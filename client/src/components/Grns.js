import React, { useEffect } from "react";
import { getLimitedGrns } from "../_actions/grnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterGrns from "./FilterGrns";

const Grns = ({ getLimitedGrns, grns, filtered }) => {
  useEffect(() => {
    getLimitedGrns();
    //eslint-diable-next-line
    console.log(grns.data);
  }, []);
  return (
    <div className='container'>
      <h4>Stock Movement Report V3 (Uploaded in Last 3 days)</h4>
      <FilterGrns />

      <table className='table table-hover table-striped table-responsive-md my-2'>
        <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
          <tr>
            <th scope='col'>ECCI</th>
            <th scope='col'>Transaction Type</th>
            <th scope='col'>Mode Of Delivery</th>
            <th scope='col'>In Date</th>
            <th scope='col'>Trans Date</th>
            <th scope='col'>Vendor Code</th>
            <th scope='col'>Vendor Name</th>
          </tr>
        </thead>
        <tbody>
          {filtered !== null
            ? filtered.map((grn) => (
                <tr key={grn._id}>
                  <td>{grn.ecciNumber && grn.ecciNumber}</td>
                  <td>{grn.transactionType && grn.transactionType}</td>
                  <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                  <td>{grn.inDate && grn.inDate}</td>
                  <td>{grn.transDate && grn.transDate}</td>
                  <td>{grn.vendorCode && grn.vendorCode}</td>
                  <td>{grn.vendorName && grn.vendorName}</td>
                </tr>
              ))
            : grns.data &&
              grns.data.data.map((grn) => (
                <tr key={grn._id}>
                  <td>{grn.ecciNumber && grn.ecciNumber}</td>
                  <td>{grn.transactionType && grn.transactionType}</td>
                  <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                  <td>{grn.inDate && grn.inDate}</td>
                  <td>{grn.transDate && grn.transDate}</td>
                  <td>{grn.vendorCode && grn.vendorCode}</td>
                  <td>{grn.vendorName && grn.vendorName}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

Grns.propTypes = {
  getLimitedGrns: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  grns: state.grn.grns,
  loading: state.grn.loading,
  filtered: state.grn.filtered,
});

export default connect(mapStatetoProps, {
  getLimitedGrns,
})(Grns);
