import React from 'react';

const Friends = ({ friends }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h4>Friends</h4>
    </div>
    <div className="panel-body">
      {friends.length === 0 &&
        <p>you have no friends :(</p>
      }
      {friends.map((friend, i) => {
        return (
          <div key={i} className="list-group-item">
            <span className="badge">{friend.average.steps}</span>
            <img
              src={friend.user.avatar}
              style={{ height: 50, left: 10, borderRadius: '50%' }}
              alt=""
            />
            <h4>{friend.user.displayName}</h4>
          </div>
        );
      })}
    </div>
  </div>
);

export default Friends;
