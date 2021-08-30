import React, { useEffect } from "react";
import { getLimitedAsns } from "../_actions/asnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterAsn from "./FilterAsns";

const Asns = ({ getLimitedAsns, asns, filtered }) => {
  useEffect(() => {
    getLimitedAsns();
    //eslint-diable-next-line
  }, []);
  return (
    <div className='container' style={{ paddingTop: "130px" }}>
      <h5 className='bg-light p-2 border-left border-primary'>
        ASN Report (Uploaded in last 3 days)
      </h5>

      <FilterAsn />
      <table className='table table-hover table-striped table-responsive-md my-2'>
        <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
          <tr>
            <th scope='col'>ECCI</th>
            <th scope='col'>ASN Upload Date</th>
            <th scope='col'>Vendor Code</th>
            <th scope='col'>Vendor Name</th>
          </tr>
        </thead>
        <tbody>
          {filtered !== null
            ? filtered.map((asn) => (
                <tr key={asn._id}>
                  <td>{asn.ecciNumber && asn.ecciNumber}</td>
                  <td>{asn.asnUploadDate && asn.asnUploadDate}</td>
                  <td>{asn.vendorCode && asn.vendorCode}</td>
                  <td>{asn.vendorName && asn.vendorName}</td>
                </tr>
              ))
            : asns.data &&
              asns.data.data.map((asn) => (
                <tr key={asn._id}>
                  <td>{asn.ecciNumber && asn.ecciNumber}</td>
                  <td>{asn.asnUploadDate && asn.asnUploadDate}</td>
                  <td>{asn.vendorCode && asn.vendorCode}</td>
                  <td>{asn.vendorName && asn.vendorName}</td>
                </tr>
              ))}
        </tbody>
      </table>
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
});

export default connect(mapStatetoProps, {
  getLimitedAsns,
})(Asns);
