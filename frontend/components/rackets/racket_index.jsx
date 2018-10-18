import React from "react";
import { withRouter } from "react-router";
import LoadingIcon from '../loading_icon';
import RacketIndexItem from './racket_index_item';

class RacketIndex extends React.Component {
  constructor(props) {
    super(props)
    this.navigateToRacketForm = this.navigateToRacketForm.bind(this);
    this.addRacketButton = this.addRacketButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchRackets();
  }

  navigateToRacketForm() {
    this.props.history.push("/racket-form")
  }

  addRacketButton() {
    if (this.props.admin) {
      return <button className="add-racket-button green-button" onClick={this.navigateToRacketForm}>Add New Racket</button>
    }
  }

  render() {
    const { rackets, loading } = this.props;
    if (loading) {
      return (
        <div>
          <div className="spacing-container"></div>
          <LoadingIcon />
        </div>
      )
    } else {
      const racketItems = rackets.map(racket => <RacketIndexItem key={racket.id} racket={racket} />)
      return (
        <div>
          { this.addRacketButton() }
          <div className="spacing-container"></div>
          <h3 className="racket-index-title">Rackets</h3>
          <div className="racket-index-container">
            { racketItems }
          </div>
        </div>
      )
    }
  }
}

export default withRouter(RacketIndex)
