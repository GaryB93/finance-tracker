import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Info from './Info';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemDescription: '',
      itemValue: '',
      itemDate: '',
      currDate: '',
      dateDisplay: '',
    }
    this.handleDataFetch = this.handleDataFetch.bind(this);
    this.handleItemInput = this.handleItemInput.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  // FETCH DATABASE ITEMS
  async handleDataFetch(dateStr, dateDisplay) {
    const url = `/api/expenses/${dateStr}`;
    await fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({ 
          items: data,
          currDate: dateStr,
          dateDisplay: dateDisplay,
        })});
  }

  // UPDATE STATE WHILE USER ENTERS INPUT
  handleItemInput({ target }) {
    this.setState({ [target.name]: target.value});
  }

  // UPDATE STATE AFTER USER PICKS A DATE FOR ITEM TO BE ADDED
  handleDateInput({ target }) {
    const date = target.value.slice(0,7);
    this.setState({ itemDate: date });
  }

  // HANDLE CLICK TO POST NEW ITEM TO DATABASE
  async handleAddItem() {
    // IF EITHER INPUT IS EMPTY DO NOTHING
    if (!this.state.itemDescription || !this.state.itemValue || !this.state.itemDate) return;

    // MAKE POST REQUEST TO ADD TO DATABASE
    await fetch('/api/items',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({
          item: this.state.itemDescription,
          amount: this.state.itemValue,
          date: this.state.itemDate,
          type: 'expense'
        })
      }
    );

    this.handleDataFetch(this.state.currDate, this.state.dateDisplay);
  }

  // HANDLE CLICK TO DELETE ITEM FROM DATABASE
  async handleDeleteItem(item_id) {
    const url = `/api/delete/${item_id}`
    // MAKE DELETE REQUEST TO DATABASE
    await fetch(url, { method: 'POST' });
    this.handleDataFetch(this.state.currDate, this.state.dateDisplay);
  }

  // FETCH DATA AFTER COMPONENT RENDERS
  componentDidMount() {
    const date = new Date();
    // GET CURRENT MONTH
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let monthNum = date.getMonth();
    const month = months[monthNum];
    monthNum++;
    monthNum < 10 ? monthNum = '0' + monthNum.toString() : monthNum = monthNum.toString();
    // GET CURRENT YEAR
    let year = date.getFullYear().toString();
    // CREATE STRING FROM DATE
    const dateStr = year.concat('-', monthNum);
    const dateDisplay = month.concat(' ', year);
    // CREATE DATE DISPLAY FOR CURRENT MONTH AND YEAR

    this.handleDataFetch(dateStr, dateDisplay);
  }

  // RENDER COMPONENTS
  render() {
    const expenseItems = [];
    // iterate over array of items
    for (const item of this.state.items) {
      expenseItems.push(
        <div className="info-with-btn" key={item.id}>
          <Info name={item.description} value={item.amount}/>
          <button type="button" className="secondary-btn" onClick={() => this.handleDeleteItem(item.id)}>Delete</button>
        </div>
      );
    }

    return (
      <>
        <h2>{this.state.dateDisplay}</h2>
        <h3>(Expenses)</h3>
        <div className="main-display">
          {expenseItems}
        </div>
        <div className="add-fields">
          <input name="itemDescription" type="text" placeholder="Description" onChange={this.handleItemInput}/>
          <input name="itemValue" type="text" placeholder="$0.00" onChange={this.handleItemInput}/>
          <input name="itemDate" type="date" onChange={this.handleDateInput}/>
          <button type="button" className="secondary-btn" onClick={this.handleAddItem}>Add</button>
        </div>
        <Link to={'/home'}>
          <button type="button" className="primary-btn">Home</button>
        </Link>
      </>
    )
  }
}

export default Expenses;