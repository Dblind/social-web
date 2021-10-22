import React, { ChangeEvent, ChangeEventHandler } from "react";
import css from './ProfileInfo.module.css';

type PropsType = {
  status: string,
  updateStatus: (newStatus: string) => void,
}
type StateType = {
  editMode: boolean,
  status: string,
}

class ProfileStatus extends React.Component<PropsType, StateType> {

  statusInpoutRef = React.createRef();

  state = {
    editMode: false,
    status: this.props.status,
  }

  setEditMode(value: boolean) {
    this.setState({ editMode: value, });
    if (!value) {
      this.props.updateStatus(this.state.status);
    }
  }

  onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {   // ????????????
    console.log("write");
    this.setState({
      status: event.currentTarget.value,
    })
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    // debugger
    if (prevProps.status !== this.props.status)
      this.setState({
        status: this.props.status,
      });
    let s = this.state;
    let p = this.props;
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
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
              // ref={this.statusInpoutRef}
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