import React from "react";
import css from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

  statusInpoutRef = React.createRef();

  state = {
    editMode: false,
    status: this.props.status,
  }

  setEditMode(value) {
    this.setState({ editMode: value, });
    if (!value) {
      this.props.updateStatus(this.state.status);
    }
  }

  onStatusChange = (event) => {
    console.log("write");
    this.setState({
      status: event.currentTarget.value,
    })
  }

  render() {
    return (
      <div className={css.status}>
        {!this.state.editMode
          ?
          <div onDoubleClick={() => this.setEditMode(true)}>
            <span>Status: {this.state.status}</span>
          </div>
          :
          <div >
            <input
              onChange={this.onStatusChange}
              ref={this.statusInpoutRef}
              type="text" value={this.state.status}
              className={css.status__input}
              autoFocus={true}
              onBlur={() => this.setEditMode(false)}
            />
          </div>}
      </div>
    )
  }
}


export default ProfileStatus;