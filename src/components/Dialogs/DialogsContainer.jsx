import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageCreateAction, updateNewMessageBodyCreateAction } from '../../Redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';



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

let mapStateToProps = function(state) {
  return {
    dialogsPage: state.dialogsPage,
  }
}

let mapDispatchToProps = function(dispatch) {
  return {
    changeTextarea: (text) => {dispatch(updateNewMessageBodyCreateAction(text))},
    sendPost: () => dispatch(sendMessageCreateAction()),
  }
}

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);



export default DialogsContainer;