import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Info from './Info';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      'item-description': '',
      'item-value': '',
    }
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // FETCH DATABASE ITEMS
  handleStateChange() {
    fetch('/api/expenses')
      .then(data => data.json())
      .then(data => { this.setState({ items: data})});
  }

  // UPDATE STATE WHILE USER ENTERS INPUT
  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value});
  }

  // HANDLE CLICK TO POST NEW ITEM TO DATABASE
  handleAdd() {
    // IF EITHER INPUT IS EMPTY DO NOTHING
    if (!this.state['item-description'] || !this.state['item-value']) return;

    // MAKE POST REQUEST TO ADD TO DATABASE
    fetch('/api/items',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          item: this.state['item-description'],
          amount: this.state['item-value'],
          type: 'expense'
        })
      }
    );

    this.handleStateChange();
  }

  handleDelete(item_id) {
    const url = `/api/delete/${item_id}`
    // MAKE DELETE REQUEST TO DATABASE
    fetch(url, { method: 'POST' });
    this.handleStateChange();
  }

  // FETCH DATA AFTER COMPONENT RENDERS
  componentDidMount() {
    this.handleStateChange();
  }

  render() {
    const expenseItems = [];
    // iterate over array of items
    for (const item of this.state.items) {
      expenseItems.push(
        <div className="info-with-btn" key={item.item_id}>
          <Info name={item.description} value={item.amount}/>
          <button type="button" onClick={() => this.handleDelete(item.item_id)}>Delete</button>
        </div>
      );
    }

    return (
      <>
        <div className="main-display">
          {expenseItems}
        </div>
        <div className="add-fields">
          <input name="item-description" type="text" placeholder="Description" onChange={this.handleInputChange}/>
          <input name="item-value" type="text" placeholder="$0.00" onChange={this.handleInputChange}/>
          <button type="button" className="secondary-btn" onClick={this.handleAdd}>Add</button>
        </div>
        <Link to={'/home'}>
          <button type="button" className="primary-btn">Home</button>
        </Link>
      </>
    )
  }
}

export default Expenses;