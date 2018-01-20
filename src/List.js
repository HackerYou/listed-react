import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
  constructor(){
    super();
    this.state = {
      currentValue: '',
      sortBy: 'latest'
    }
    this.renderItems = this.renderItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
  }
  renderItems(){
    const popular = (a, b) => a.score < b.score;
    const latest = (a, b) => a.created_at < b.created_at;

    const sortedList = Array.from(this.props.listInfo.items)
      .sort(this.state.sortBy === 'popular' ? popular : latest);

    const listItems = sortedList.map((item) => {
      return (
        <ListItem key={item._id} listId={this.props.listInfo._id} itemInfo={item} updateVote={this.updateVote} />
      )
    });

    return listItems;

  }
  handleChange(e){
    this.setState({
      currentValue: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    // call the method passed down by props to add to list
    this.props.addToList(this.props.listInfo._id, this.state.currentValue);

    // clear the currentValue to reset the form
    this.setState({
      currentValue: ''
    })
  }
  setSortBy(e) {
    this.setState({
      sortBy: e.target.id
    })
  }
  render(){
    return(
      <div className="list">
        <header>
          <h2>{this.props.listInfo.title}</h2>
          <div className='list__sorting'>
            <p>Sort by:</p>
            <button onClick={this.setSortBy} id='popular'>Most Popular <span role="img" aria-label="fire">🔥</span></button>
            <button onClick={this.setSortBy} id='latest'>Latest <span role="img" aria-label="clock">🕘</span></button></div>
        </header>
        <ul>
          {this.renderItems()}
          <li className="list__item">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="newItem" className="visually-hidden">Add To List:</label>
              <input value={this.state.currentValue} onChange={this.handleChange} type="text" id="newItem" placeholder="add item to list" />
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

export default List;