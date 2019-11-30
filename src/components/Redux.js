const { createStore } = require("redux");

const initialSetting = {
  settings: {
    peoples: "",
    flavours: "",
    slicesperperson: "",
    slicesinpizza: ""
  },
  persons: []
};
const myReducer = (state = initialSetting, action) => {
  // console.log("newState");
  // console.log(JSON.stringify(state));
  switch (action.type) {
    case "SAVE":
      state.settings.peoples = action.pizza.peoples;
      state.settings.flavours = action.pizza.flavours;
      state.settings.slicesperperson = action.pizza.slicesperperson;
      state.settings.slicesinpizza = action.pizza.slicesinpizza;
      state.persons = action.pizza.persons;
      return state;
    case "RESET":
      state.settings.peoples = "";
      state.settings.flavours = "";
      state.settings.slicesperperson = "";
      state.settings.slicesinpizza = "";
      state.persons = [];
      return state;
    case "INCREMENT":
      state.persons = action.persons;
      return state;
    case "DECREMENT":
      state.persons = action.persons;
      return state;
    default:
      return state;
  }
};

const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  // console.log("SETTING : " + store.getState().slicesinpiza);
  // console.log("STATE : " + JSON.stringify(store.getState()));
});

export default store;
