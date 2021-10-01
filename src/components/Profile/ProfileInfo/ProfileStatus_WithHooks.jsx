import React from "react";
import { useState } from "react";
import css from './ProfileInfo.module.css';

function ProfileStatus_WithHooks(props) {

  // statusInpoutRef = React.createRef();

  // state = {
  //   editMode: false,
  //   status: this.props.status,
  // }

  // setEditMode(value) {
  //   this.setState({ editMode: value, });
  //   if (!value) {
  //     this.props.updateStatus(this.state.status);
  //   }
  // }

  // onStatusChange = (event) => {
  //   console.log("write");
  //   this.setState({
  //     status: event.currentTarget.value,
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // debugger
  //   if (prevProps.status !== this.props.status)
  //     this.setState({
  //       status: this.props.status,
  //     });
  //   let s = this.state;
  //   let p = this.props;
  //   console.log("componentDidUpdate");
  // }

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status);

  function updateStatus() {
    setEditMode(false);
    props.updateStatus(status);
  }

  function onStatusChange(event) {
    setStatus(event.currentTarget.value);
  }
  
  
    return (
      <div className={css.status}>
        {!editMode
          ?
          <div onDoubleClick={() => setEditMode(true)}>
            <span>Status: {status}</span>
          </div>
          :
          <div >
            <input
              onChange={event => onStatusChange(event)}
              // ref={this.statusInpoutRef}
              type="text" value={status}
              // className={css.status__input}
              autoFocus={true}
              onBlur={() => updateStatus()}
            />
          </div>}
      </div>
    )
  
}


export default ProfileStatus_WithHooks;