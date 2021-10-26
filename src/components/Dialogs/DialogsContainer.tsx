import React from 'react';
import Dialogs from './Dialogs';
import { sendMessage, updateNewMessageBodyCreateAction } from '../../Redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';



const forStoreContext_DialogsContainer = (props: any) => {

  return <StoreContext.Consumer>{
    (store: any) => {
      function commitChangesTextarea(text: string) {
        store.dispatch(updateNewMessageBodyCreateAction(text));
      }
      function sendPost() {
        store.dispatch(sendMessage(""));
      }

      return <Dialogs
        dialogsPage={store.getState().dialogsPage}
        changeTextarea={commitChangesTextarea}
        sendPost={sendPost}

      />
    }
  }
  </StoreContext.Consumer>
}


// let authRedirectComponent = withAuthRedirect(Dialogs);  // HOC redirect if login

const mapStateToProps = function (state: AppStateType) {
  return {
    dialogsPage: state.dialogsPage,
  }
}


let mapDispatchToProps = function (dispatch: any) {
  return {
    changeTextarea: (text: string) => { dispatch(updateNewMessageBodyCreateAction(text)) },
    sendPost: (post: string) => dispatch(sendMessage(post)),
  }
}

let DialogsContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);


// let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(authRedirectComponent);



// DialogsContainer > compose { withAuthRedirect > connect(maps)(Dialogs) } >>
export default DialogsContainer;  