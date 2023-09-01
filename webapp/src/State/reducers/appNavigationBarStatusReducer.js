// import {
//   TOGGLE_LEFT_NAV,
//   SHOW_HIDE_LEFT_NAV,
// } from "../actions/collapsibleNavBar";
// import { LOGOUT_USER } from "../actions/user";
//
// let initialState = {
//   show: true,
//   showTopNav: true
// };
// function appNavigationBarStatusReducer(state = initialState, action) {
//   switch (action.type) {
//     case TOGGLE_LEFT_NAV:
//       return {
//         show: !state.show
//       };
//     case SHOW_HIDE_LEFT_NAV:
//       return {
//         show: action.data
//       };
//     case LOGOUT_USER:
//       return { ...initialState };
//     default:
//       return state;
//   }
// }
// export default appNavigationBarStatusReducer;
