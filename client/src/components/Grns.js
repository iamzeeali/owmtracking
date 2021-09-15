import React, { useEffect } from "react";
import { getLimitedGrns } from "../_actions/grnAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterGrns from "./FilterGrns";
import Spinner from "./ui/Spinner";
import Moment from "react-moment";

const Grns = ({ getLimitedGrns, grns, filtered, loading }) => {
  useEffect(() => {
    getLimitedGrns();
    //eslint-diable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container-fluid' style={{ paddingTop: "130px" }}>
      <h5 className='bg-light p-2 border-left border-primary'>
        Stock Movement Report V3 (Uploaded in Last 7 days)
      </h5>
      <FilterGrns />

      <div className='tableFixHead'>
        <table className='table table-hover table-responsive-md table-striped my-2'>
          <thead style={{ backgroundColor: "#045E84", color: "#fff" }}>
            <tr>
              <th scope='col'>ECCI</th>
              <th scope='col'>Transaction Type</th>
              <th scope='col'>Mode Of Delivery</th>
              <th scope='col'>In Date</th>
              <th scope='col'>Trans Date</th>
              <th scope='col'>Vendor Code</th>
              <th scope='col'>Vendor Name</th>
              <th scope='col'>Uploaded at</th>
            </tr>
          </thead>
          <tbody>
            {filtered !== null
              ? filtered.map((grn) => (
                  <tr key={grn._id}>
                    <td>{grn.ecciNumber && grn.ecciNumber}</td>
                    <td>{grn.transactionType && grn.transactionType}</td>
                    <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {grn.inDate && grn.inDate}
                      </Moment>{" "}
                    </td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {grn.transDate && grn.transDate}
                      </Moment>{" "}
                    </td>
                    <td>{grn.vendorCode && grn.vendorCode}</td>
                    <td>{grn.vendorName && grn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY hh:mm:ss a'>
                        {grn.date && grn.date}
                      </Moment>
                    </td>
                  </tr>
                ))
              : grns.data &&
                grns.data.data.map((grn) => (
                  <tr key={grn._id}>
                    <td>{grn.ecciNumber && grn.ecciNumber}</td>
                    <td>{grn.transactionType && grn.transactionType}</td>
                    <td>{grn.modeOfDelivery && grn.modeOfDelivery}</td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {grn.inDate && grn.inDate}
                      </Moment>{" "}
                    </td>
                    <td>
                      {" "}
                      <Moment format='DD-MMM-YYYY'>
                        {grn.transDate && grn.transDate}
                      </Moment>{" "}
                    </td>
                    <td>{grn.vendorCode && grn.vendorCode}</td>
                    <td>{grn.vendorName && grn.vendorName}</td>
                    <td>
                      <Moment format='DD-MMM-YYYY hh:mm a  '>
                        {grn.date && grn.date}
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
