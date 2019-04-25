import React from 'react';

export default props => {
  console.log(props.posts)
  return (
    <div className="Posts">
      {props.posts.map(post => {
        return (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </div>
        )
      })}
    </div>
  )
}