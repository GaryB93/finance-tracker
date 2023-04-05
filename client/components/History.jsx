import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <>
        <div className="main-display">
        </div>
        <Link to={'/home'}>
          <button type="button" className="primary-btn">Home</button>
        </Link>
      </>
    )
  }
}

export default History;
