import React from 'react';
import { fetchJSONData } from '../utils/utils';

export default class Filter extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      searchStr: '',
      checkCaseOfLetters: false,
      filter: null,
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('data'));

    // file isn't changed during day.
    if (data && data.dateOfReceiving === (new Date()).toLocaleDateString()) {
      this.setState({ data: data.data });
    } else {
      fetchJSONData('/data.json')
        .then((json) => {
          this.setState({ data: json.data });
          localStorage.setItem(
            'data',
            JSON.stringify({
              ...json,
              dateOfReceiving: (new Date()).toLocaleDateString(),
            })
          );
        });
    }
  }

  inputHandler = (event) => {
    this.inputValue =  event.target.value;
  };

  checkboxHandler = (event) => {
    this.setState({ checkCaseOfLetters: event.target.checked });
  };

  filterBySubstrHandler = () => {
    this.setState({
      searchStr: this.inputValue || '',
      filter: this.filterBySubstr,
    });
  };

  filterBySubstr = (str) => {
    if (this.state.checkCaseOfLetters) {
      return str.includes(this.state.searchStr);
    }
    return str.toLowerCase().includes(this.state.searchStr.toLowerCase());
  };

  filterByLengthHandler = () => {
    this.setState({
      searchStr: this.inputValue || '',
      filter: this.filterByLength,
    });
  };

  filterByLength = (str) => {
    return str.length > this.state.searchStr;
  };

  render() {
    return (
      <div>
        <h3>filter</h3>
        <div className="row">
          <input onChange={this.inputHandler} type="text"/>
          <label>
            Чувствительность регистра
            <input
              name="checkCaseOfLetters"
              type="checkbox"
              checked={this.state.checkCaseOfLetters}
              onChange={this.checkboxHandler}
            />
          </label>
        </div>
        <div className="row">
          <button onClick={this.filterByLengthHandler}>Фильтр по по длине слов</button>
          <button onClick={this.filterBySubstrHandler}>Фильтр по подстроке</button>
        </div>
        <ul>
          {(this.state.filter ? this.state.data.filter(this.state.filter) : this.state.data)
            .map((value, i) => {
            return (
              <li key={i}>{value}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}
