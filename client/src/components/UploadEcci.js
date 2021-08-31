import React, { useState } from "react";
import axios from "axios";
import AddAsn from "./AddAsn";
import AddGrn from "./AddGrn";
import { Link } from "react-router-dom";

const UploadEcci = () => {
  const [ecciFile, setEcciFile] = useState();
  const [grnFile, setGrnFile] = useState();

  const onFileChangeOne = (e) => {
    setEcciFile(e.target.files[0]);
    // alert('fileSelected', file)
  };

  const onFileChangeTwo = (e) => {
    setGrnFile(e.target.files[0]);
    // alert('fileSelected', file)
  };

  const onSubmitHandlerOne = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("ecciFile", ecciFile);
    axios
      .post("http://localhost:5000/api/asn", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log("Status: ", response.status);
        alert("Uploaded Sucessfully");
      })
      .catch((error) => {
        alert("Incorrect Document!");
      });

    setEcciFile();
  };

  const onSubmitHandlerTwo = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("grnFile", grnFile);
    axios
      .post("http://localhost:5000/api/grn", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log("Status: ", response.status);
        alert("Uploaded Sucessfully");
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
        alert("Incorrect Document!");
      });

    setGrnFile();
  };

  return (
    <div className='upload'>
      <div className='container' style={{ paddingTop: "130px" }}>
        <h5 className='border-left border-primary p-2 mb-5 bg-light'>
          Upload or Create ASNS & Stock Movement Report
        </h5>
        <div className='row pt-4'>
          <div className='col-sm-4 p-3 card shadow-sm col-md-offset-6'>
            <form
              onSubmit={(e) => onSubmitHandlerOne(e)}
              encType='multipart/form-data'
              className='text-center'
            >
              <div className='form-group'>
                <b>ASN REPORT - TO BE RECEIVED </b> <br />
                <Link to='/asns' className='btn btn-warning mt-3'>
                  VIEW REP22246
                </Link>
                <br />
                <br />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      ASN
                    </span>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      id='ecci'
                      aria-describedby='inputGroupFileAddon01'
                      name='ecciFile'
                      onChange={onFileChangeOne}
                      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      required
                    />
                    <label className='custom-file-label' for='inputGroupFile01'>
                      Choose file
                    </label>
                  </div>
                </div>
                <small>*Upload xls/xlsx file</small>
                <button
                  type='submit'
                  className='btn btn-block btn-primary mt-4'
                >
                  UPLOAD
                </button>
              </div>
            </form>
            <p className='text-center'>Or</p>
            <AddAsn />
          </div>
          <div className='col-sm-4 text-center'>
            <img src='/track.png' alt=' ' width='70%' className='pt-5' />
          </div>

          <div className='col-sm-4 p-3 card shadow-sm col-md-offset-6'>
            <form
              onSubmit={(e) => onSubmitHandlerTwo(e)}
              encType='multipart/form-data'
              className='text-center'
            >
              <div className='form-group'>
                <b>Stock Movement Report </b> <br />
                <Link to='/grns' className='btn btn-warning mt-3'>
                  VIEW GRN-REP22248
                </Link>
                <br />
                <br />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      GRN
                    </span>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      id='grnFile'
                      aria-describedby='inputGroupFileAddon01'
                      name='grnFile'
                      onChange={onFileChangeTwo}
                      accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      required
                    />
                    <label className='custom-file-label' for='inputGroupFile01'>
                      Choose file
                    </label>
                  </div>
                </div>
                <small>*Upload xls/xlsx file</small>
                <button
                  type='submit'
                  className='btn btn-block btn-primary mt-4'
                >
                  UPLOAD
                </button>
              </div>
            </form>
            <p className='text-center'>Or</p>

            <AddGrn />
          </div>
        </div>
        <div className='row text-center'></div>
      </div>
    </div>
  );
};

export default UploadEcci;
