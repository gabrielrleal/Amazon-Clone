//reducer is how we are able to dispatch to the datalayer
export const initialState = {
  basket: [],
  user: null,
};

//iterates through the basket and tallies up
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": //adding an action type to the switch case
      return {
        ...state, //return whatever the state originally was
        basket: [...state.basket, action.item], // we update the basket but here we use the spread operator (…) so that previous state is not lost. And that’s how we add items to the basket array in our state in reducer.
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
