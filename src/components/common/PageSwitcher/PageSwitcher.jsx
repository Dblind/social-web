import { useState } from "react";
import { setCurrentPageNumb } from "../../../Redux/users-reducer";
import css from '../../Users/Users.module.css';

const PageSwitcher = function ({ totalItemsCount, pageSize, pagesInBlock, ...props }) {
  let [currentPageBlock, setCurrentPageBlock] = useState(0);
  let pagesCount = Math.ceil(totalItemsCount / (pageSize > 0 ? pageSize : 1));
  let switchButtons = [];
  // let switchButtons = Array(pagesInBlock);
  for (
    let i = currentPageBlock * pagesInBlock, j = 0;
    i < (pagesCount - currentPageBlock * pagesInBlock < pagesInBlock
      ? pagesCount
      : currentPageBlock * pagesInBlock + pagesInBlock)
    && j < 20;
    i++, j++
  ) {
    let button = new pagesNavButton(i + 1, props.onGetUsersFromServer);
    switchButtons.push(button.render(i + 1 == props.currentPage ? { selector: css.switchPages__selected } : {}));
    // switchButtons[i] = button.render(i + 1 == props.currentPage ? { selector: css.switchPages__selected } : {});
  }

  return (
    <div className={css.pageSwitcher}>
      <button onClick={() => setCurrentPageBlock(currentPageBlock == 0 ? 0 : currentPageBlock - 1)}>prev</button>
      {switchButtons}
      <button onClick={() => setCurrentPageBlock(
        currentPageBlock + 1 >= pagesCount / pagesInBlock ? currentPageBlock : currentPageBlock + 1)}>
        next
      </button>
      <p>pagesCount: {pagesCount},
        currentPage: {props.currentPage},
        currentPageBlock: {currentPageBlock},
        pagesInBlock: {pagesInBlock}</p>
    </div>
  )
}
// 1234 5678 9AB
// #### #### ###
// #### #### ####


class pagesNavButton {
  constructor(currentPage, getUsers) {
    this.page = currentPage;
    this.getUsers = getUsers;
  }

  render(classNames) {
    // debugger
    return (
      <button key={this.page}  className={classNames.selector} onClick={() => this.getUsers(this.page)}>
        {this.page}
      </button>
    )
  }
}

export default PageSwitcher;

/*
6
              prev[                 ]next
1     2     3     4     5     6     7     8
------------------[page]----------
UuuuuuUuuuuuUuuuuuUuuuuuUuuuuu
12345678*12345678*12345678*123
*/