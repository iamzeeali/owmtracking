import React, { useState } from "react";
import axios from "axios";

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
        console.error("Something went wrong!", error);
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
      });

    setGrnFile();
  };

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-sm-5 p-3 card shadow-sm col-md-offset-6'>
          <form
            onSubmit={(e) => onSubmitHandlerOne(e)}
            encType='multipart/form-data'
            className='text-center'
          >
            <div className='form-group'>
              <label htmlFor='ecci'>
                <b>
                  ASN REPORT - TO BE RECEIVED
                  <p>REP22246</p>
                </b>
              </label>
              <br />
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='inputGroupFileAddon01'>
                    ASN
                  </span>
                </div>
                <div class='custom-file'>
                  <input
                    type='file'
                    class='custom-file-input'
                    id='ecci'
                    aria-describedby='inputGroupFileAddon01'
                    name='ecciFile'
                    onChange={onFileChangeOne}
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    required
                  />
                  <label class='custom-file-label' for='inputGroupFile01'>
                    Choose file
                  </label>
                </div>
              </div>
              <button type='submit' className='btn btn-block btn-primary mt-4'>
                UPLOAD
              </button>
            </div>
          </form>
        </div>
        <div className='col-sm-2 col-md-offset-6'></div>

        <div className='col-sm-5 card shadow- col-md-offset-6'>
          <form
            onSubmit={(e) => onSubmitHandlerTwo(e)}
            encType='multipart/form-data'
            className='text-center'
          >
            <div className='form-group p-3'>
              <label htmlFor='ecci'>
                <b>
                  STOCK MOVEMENT REPORT V3 <p>GRN-REP22248</p>
                </b>
              </label>

              <br />
              <div class='input-group'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='inputGroupFileAddon01'>
                    GRN
                  </span>
                </div>
                <div class='custom-file'>
                  <input
                    type='file'
                    class='custom-file-input'
                    id='inputGroupFile01'
                    aria-describedby='inputGroupFileAddon01'
                    name='grnFile'
                    onChange={onFileChangeTwo}
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    required
                  />
                  <label class='custom-file-label' for='inputGroupFile01'>
                    Choose file
                  </label>
                </div>
              </div>
              <button type='submit' className='btn btn-block btn-primary mt-4'>
                UPLOAD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadEcci;
