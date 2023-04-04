import React from 'react';
import { Link } from 'react-router-dom';

function Income (props) {
  const itemsList = [];

  // connect to database and obtain all relative information
  fetch('/api/income')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });

  function addItem() {
    // obtain values entered by user
    const item = document.querySelector('#item-description').value;
    const amount = document.querySelector('#item-value').value;

    // if item description or value are empty do not attempt to connect to database
    if (!item || !amount) return;

    // make POST request to connect to database and CREATE new item
    fetch('/addIncome',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          item: item,
          amount: amount
        })
      }
    );
  }

  return (
    <div>
      <div className="grid scroll">
        <h1>Income and Expenses</h1>
        {itemsList}
      </div>

      <Link to={'/home'}>
        <button type="button">Home</button>
      </Link>
      <input id="item-description" type="text" placeholder="Description"/>
      <input id="item-value" type="text" placeholder="$0.00"/>
      <button type="button" onClick={addItem}>Add</button>
    </div>
  )
}

export default Income;