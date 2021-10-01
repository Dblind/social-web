import profileReducer, { addPostCreateAction, deletePost } from "../profile-reducer";

const post = "new post";
let actionNewPost = addPostCreateAction(post);
let state = {
  posts: [
    { id: "3", message: "Message id" },
    { id: "33", },
    { id: "1", },
    { id: "40", message: "lkasdf lsdfakldfj" },
    { id: "1092", },],
}
let newstate_newPost = profileReducer(state, actionNewPost); 

it("new post should be added. check length.", () => {
  expect(newstate_newPost.posts.length).toBe(6);
});

it("new post should be added. check message.", () => {
  expect(newstate_newPost.posts[5].message).toBe(post);
});

let actionDelete = deletePost(1);
let newState_delete = profileReducer(state, actionDelete);

it("after removing the post, the length should be reduced", () => {
  expect(newState_delete.posts.length).toBe(4);
});

it("after removing the post, the id should be removed", () => {
  expect(newState_delete.posts.some(p => p.id == 1)).toBe(false);
});

let actionDeleteMissing = deletePost(10);
let newState_deleteMissing = profileReducer(state, actionDeleteMissing);
it("removed post by missing id", () => {
  expect(newState_deleteMissing.posts.length).toBe(5);
})