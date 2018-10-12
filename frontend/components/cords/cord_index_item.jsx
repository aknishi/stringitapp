import React from "react";

class CordIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.cordImage = this.cordImage.bind(this);
  }

  cordImage() {
    const { cord } = this.props;
    console.log(cord.image);
    if (cord.image !== "") {
      return <img src={cord.image} alt="cord image"/>
    } else {
      return <div className="default-cord-image"></div>
    }
  }

  render() {
    const { cord } = this.props;
    return (
      <div className="cord-item">
        <div className="cord-image">
          { this.cordImage() }
        </div>
        <div className="cord-info">
          <h6><b>{cord.brand} {cord.model} {cord.gauge} {cord.color}</b></h6>
          <h6>{cord.composition}</h6>
        </div>
      </div>
    )
  }
}

export default CordIndexItem
