import React from 'react'

class Square extends React.Component {
    render() {
      return (
        <button
          className="square"
          onClick={this.props.onClick}
          style={{ width: "40px", height: "40px" }}
        >
          {this.props.value}
        </button>
      );
    }
  }

  export default Square;