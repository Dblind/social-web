import React from "react";
import css from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  }

  setEditMode(value) {
    this.setState({editMode: value,});
  }

  render() {
    return (
      <div className={css.status}>
        {!this.state.editMode
          ?
          <div onClick={() => this.setEditMode(true)}>
            <span>Status: {this.props.status}</span>
          </div>
          :
          <div >
            <input 
            type="text" value={this.props.status} 
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