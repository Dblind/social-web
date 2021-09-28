import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageCreateAction, updateNewMessageBodyCreateAction } from '../../Redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';



const forStoreContext_DialogsContainer = (props) => {

  return <StoreContext.Consumer>{
    (store) => {
      function commitChangesTextarea(text) {
        store.dispatch(updateNewMessageBodyCreateAction(text));
      }
      function sendPost() {
        store.dispatch(sendMessageCreateAction());
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

let mapStateToProps = function (state) {
  return {
    dialogsPage: state.dialogsPage,
  }
}


let mapDispatchToProps = function (dispatch) {
  return {
    changeTextarea: (text) => { dispatch(updateNewMessageBodyCreateAction(text)) },
    sendPost: (post) => dispatch(sendMessageCreateAction(post)),
  }
}

let DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);


// let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(authRedirectComponent);



// DialogsContainer > compose { withAuthRedirect > connect(maps)(Dialogs) } >>
export default DialogsContainer;  