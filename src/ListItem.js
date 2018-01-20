import React from 'react';

const ListItem = (props) => {
  return (
    <li className="list__item">
      {props.itemInfo.item}
      <div className="item__scoreCard">
        <span className="scoreCard__score">{props.itemInfo.score}</span>
        <button onClick={() => props.updateScore(props.itemInfo._id, props.listId, 1)}><span role="img" aria-label="thumbs up">👍</span>Upvote</button>
        <button onClick={() => props.updateScore(props.itemInfo._id, props.listId, -1)}>Downvote<span role="img" aria-label="thumbs down">👎</span></button>
      </div>
    </li>
  )
}

export default ListItem;