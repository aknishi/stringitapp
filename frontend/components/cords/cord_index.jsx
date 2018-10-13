import React from "react";
import { withRouter } from "react-router";
import LoadingIcon from '../loading_icon';
import CordIndexItem from './cord_index_item';

class CordIndex extends React.Component {
  constructor(props) {
    super(props)
    this.navigateToCordForm = this.navigateToCordForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchCords();
  }

  navigateToCordForm() {
    this.props.history.push("/string-form")
  }

  render() {
    const { cords, loading } = this.props;
    if (loading) {
      return (
        <div>
          <div className="spacing-container"></div>
          <LoadingIcon />
        </div>
      )
    } else {
      const cordItems = cords.map(cord => <CordIndexItem key={cord.id} cord={cord} />)
      return (
        <div>
          <button className="add-cord-button green-button" onClick={this.navigateToCordForm}>Add New String</button>
          <div className="spacing-container"></div>
          <h3 className="cord-index-title">Strings</h3>
          <div className="cord-index-container">
            { cordItems }
          </div>
        </div>
      )
    }
  }
}

export default withRouter(CordIndex)
