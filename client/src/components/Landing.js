import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className='App'>
      <h1>Landing</h1>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Landing;
