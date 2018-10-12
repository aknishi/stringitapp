import React from "react";

class RacketIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.racketImage = this.racketImage.bind(this);
  }

  racketImage() {
    const { racket } = this.props;
    if (racket.image !== "") {
      return <img src={racket.image} alt="racket image"/>
    }
  }

  render() {
    const { racket } = this.props;
    return (
      <div className="racket-item">
        <div className="racket-image">
          { this.racketImage() }
        </div>
        <h5>{racket.brand}</h5>
        <h6>{racket.model}</h6>
      </div>
    )
  }
}

export default RacketIndexItem
