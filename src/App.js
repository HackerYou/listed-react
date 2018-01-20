import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import List from './List';
import _ from 'underscore';

class App extends Component {
  constructor(){
    super();
    this.state = {
      lists: {}
    }
    this.updateScore = this.updateScore.bind(this);
    this.addToList = this.addToList.bind(this);
  }
  componentDidMount(){
    axios.get(`http://lists.hackeryou.com/list`).then((res) => {
      const listObj = _.indexBy(res.data, '_id')
      this.setState({
        lists: listObj
      });
    })
  }
  renderLists(){
    const lists = this.state.lists
    const listKeys = Object.keys(this.state.lists);

    return listKeys.map((listKey) => {
      return <List key={lists[listKey]._id} listInfo={lists[listKey]} updateScore={this.updateScore} addToList={this.addToList}/> 
    });
  }
  updateScore(itemId, listId, updateValue){
    // make a copy of the current state
    const newState = JSON.parse(JSON.stringify(this.state.lists));

    let newValue;

    // find the list item in the copied state and update it
    newState[listId].items.forEach((item, index) => {
      if(item._id === itemId){
        newState[listId].items[index].score += updateValue;
        newValue = newState[listId].items[index].score;
      }
    });

    // call set state to update application state
    this.setState({
      lists: newState
    });

    // update api 
    axios.post(`http://lists.hackeryou.com/item/${itemId}`, {
      score: newValue
    });
    
  }
  addToList(listId, item){
    // removes extra whitespace before and after the string
    item.trim();
    // only add to list if the item is not an empty string
    if (item !== ''){
      axios.post(`http://lists.hackeryou.com/list/${listId}/item`, {
        item
      }).then((res) => {
        // add the new list item to the list to update the UI instantly instead of having to refresh
        const newState = JSON.parse(JSON.stringify(this.state.lists));
    
        newState[listId].items.push(res.data.item);

        this.setState({
          lists: newState
        })
        
      });
     }

  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Listed</h1>
          <form action="">
            <input type="text" placeholder="Add a list"/>
          </form>
        </header>
        <main>
          {this.renderLists()}
        </main>
      </div>
    );
  }
}

export default App;
