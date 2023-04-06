import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Info from './Info';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: '',
      expenses: '',
      dateDisplay: '',
    };
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(arrOfItems, dateDisplay) {
    let newIncome = 0;
    let newExpenses = 0;
    // iterate through array of items
    for (const item of arrOfItems) {
      item.type === 'income' ? newIncome += item.amount : newExpenses += item.amount;
    }

    this.setState({
      income: newIncome,
      expenses: newExpenses,
      dateDisplay: dateDisplay,
    });
  }

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
    
    const url = `/api/month/${dateStr}`;
    console.log(url);
    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.handleStateChange(data, dateDisplay);
      });
  }

  render(){
    return (
      <>
        <h2>{this.state.dateDisplay}</h2>
        <h3>Summary</h3>
        <div className="main-display">
          <div className="info-with-btn">
            <Info name="Income" value={this.state.income}/>
            <Link to={'/income'}>
              <button type="button" className="secondary-btn">Edit</button>
            </Link>
          </div>
          
          <div className="info-with-btn">
            <Info name="Expenses" value={this.state.expenses}/>
            <Link to={'/expenses'}>
              <button type="button" className="secondary-btn">Edit</button>
            </Link>
          </div>

          <Info name="Total" value={this.state.income - this.state.expenses}/>
        </div>

        <Link to={'/history'}>
          <button type="button" className="primary-btn">History</button>
        </Link>
      </>
    )
  }
}

export default Home;