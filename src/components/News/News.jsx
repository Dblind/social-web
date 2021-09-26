import React from "react";
import css from './News.module.css';

// const News = function(props) {
class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }
   
  render() { return (
    <div className={css.news__button}>

      <button onClick={(event) => {
        this.setState({count: this.state.count + 1, });
      }}>+</button>
      <h1>{this.state.count}</h1>
      <div>
        <p>1. News name.</p>
      </div>
      <div>
        <p>2. News name.</p>
      </div>
      <div>
        <p>3. News name.</p>
      </div>
      <div>
        <p>4. News name.</p>
      </div>
      <div>
        <p>5. News name.</p>
      </div>
      <div>
        <p>6. News name.</p>
      </div>
      <div>
        <p>7. News name.</p>
      </div>
      <div>
        <p>8. News name.</p>
      </div>
    </div>
  )
}
}

export default News;