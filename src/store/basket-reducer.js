const defaultStore = {
  basket: [],
  idOfTheLastAddedProduct: undefined,
};

export const basketReducer = (state = defaultStore, action) => {
  const updateProduct = (prodId, state, count = 1) => {
    const index = state.basket.findIndex(prod => prod.id === prodId);
    const product = state.basket[index];
    if (!product) return false;
    const updateProduct =
      product.count + count > 0
        ? [
            {
              ...product,
              count: product.count + count,
            },
          ]
        : [];
    return {
      ...state,
      basket: state.basket.toSpliced(index, 1, ...updateProduct),
      idOfTheLastAddedProduct: prodId,
    };
  };

  switch (action.type) {
    case 'ADD_TO_BASKET':
      return (
        updateProduct(action.payload.id, state) || {
          ...state,
          basket: [...state.basket, action.payload],
          idOfTheLastAddedProduct: action.payload.id,
        }
      );
    case 'INCREMENT_PRODUCT':
      return updateProduct(action.payload, state);
    case 'DECREMENT_PRODUCT':
      return updateProduct(action.payload, state, -1);

    default:
      return state;
  }
};
