import React from "react";
import { withRouter } from "react-router";
import LoadingIcon from '../loading_icon';
import CordIndexItem from './cord_index_item';

class CordIndex extends React.Component {
  constructor(props) {
    super(props)
    this.navigateToCordForm = this.navigateToCordForm.bind(this);
    this.addStringButton = this.addStringButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchCords();
  }

  navigateToCordForm() {
    this.props.history.push("/string-form")
  }

  addStringButton() {
    if (this.props.admin) {
      return <button className="add-cord-button green-button" onClick={this.navigateToCordForm}>Add New String</button>
    }
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
          {this.addStringButton()}
          <div className="spacing-container"></div>
          <div className="helper-notice">
            <p>Store currently being developed</p>
          </div>
          <h3 className="cord-index-title">Strings</h3>
          <div className="cord-index-container">
            {cordItems}
          </div>
        </div>
      )
    }
  }
}

export default withRouter(CordIndex)
