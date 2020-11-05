export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": //adding an action type to the switch case
      return {
        ...state, //set the state,
        basket: [...state.basket, action.item], // we update the basket but here we use the spread operator (…) so that previous state is not lost. And that’s how we add items to the basket array in our state in reducer.
      };
    default:
      return state;
  }
};

export default reducer;
