import im from 'immutable';

function reduce(oldState, action, reducerFn, debug){
  if (debug)
    console.log("****OLD STATE****", oldState);

  const newState = reducerFn(oldState, action) || {};

  if (debug)
    console.log("****NEW STATE****", newState);

  return newState;
}

export default class MiniRedux {
  constructor(initialState, reducer, config){
    this.config = im.Map(config);
    this.state = im.Map(initialState);

    this.onDispatchCompleteCbs = [];

    this.reductionCb = reducer || ((s) => s);
    if (reducer && typeof(reducer) !== "function" && reducer.length) {
      this.reductionCb = (s, a) => reducer.reduce((state, reducerFn) => reducerFn(state, a), s);
    }

    if (this.config.get('debug')){
      this.actionStack = im.List([]);
    }
  }

  // dispatcher returns a dispatch func that can be used to modify state with standard flux actions
  dispatcher(){ return this.dispatch.bind(this); }

  // dump returns the current state model stored
  dump(){ return this.state.toObject(); }

  // actions returns an array of objects in { action, from: state } format.
  // The 'from' key is the state right before the action was applied
  actions(){ return this.actionStack.toArray(); }

  // dispatch dispatches a flux action to be reduced into a state mutation.
  // A flux action can look however you want; a typical form is { name: string, payload: obj }
  // This dispatch can take either objects in the previously mentioned form or can take a function for
  // thunk like behavior. This function is passed a dispatch function and the current app state
  dispatch(action){
    const debug = this.config.get("debug");

    return new Promise((resolve, reject) => {
      if (!action || action === null) {
        console.error("A null or undefined action was erroneously passed to dispatch");
        reject();
        return;
      }

      // if action is a function, pass dispatch as an argument
      if (typeof(action) === 'function') {
        action(this.dispatcher(), this.dump.bind(this));
        resolve();
        return;
      }

      setTimeout(() => {
        const oldState = this.state.toObject();
        const newState = im.Map(reduce(oldState, action, this.reductionCb, debug));

        if (debug) {
          this.actionStack = this.actionStack.push({ action, from: oldState });
        }

        this.state = newState;
        resolve(newState.toObject());
      }, 0);
    }).then((newState) => this.onDispatchCompleteCbs.forEach((cb) => cb(newState)));
  }

  // onDispatchComplete is called when a dispatch is completed
  onDispatchComplete(cb){
    this.onDispatchCompleteCbs.push(cb);
  }
}
