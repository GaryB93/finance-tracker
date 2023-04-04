import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Info from './Info';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: '',
      expenses: '',
    };
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(arrOfItems) {
    let newIncome = 0;
    let newExpenses = 0;
    // iterate through array of items
    for (const item of arrOfItems) {
      item.type === 'income' ? newIncome += item.amount : newExpenses += item.amount;
    }

    this.setState({
      income: newIncome,
      expenses: newExpenses
    });
  }

  componentDidMount() {
    fetch('/api/')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.handleStateChange(data);
      });
  }

  render(){
    return (
      <div>
        <div className="grid">
          <h1>Monthly Expenses</h1>
          <Info name="Income" value={this.state.income}/>
          <Link to={'/income'}>
            <button type="button">Edit</button>
          </Link>
            
          <Info name="Expenses" value={this.state.expenses}/>
          <Link to={'/expenses'}>
            <button type="button">Edit</button>
          </Link>
            
          <Info name="Total" value={this.state.income - this.state.expenses}/>
        </div>

        <Link to={'/history'}>
          <button type="button">History</button>
        </Link>
      </div>
    )
  }
}

export default Home;