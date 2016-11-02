import { actions, reducers, initialState } from './AppState.js';
import MiniRedux from './miniredux.js'

const stateContainer = new MiniRedux(initialState, reducers, { debug: false });

it('has correct initial app state', async () => {
  expect(stateContainer.dump()).toEqual(initialState);
});

const dispatch = stateContainer.dispatcher();
it('transitions gameMode state to Simulation', async () => {
  await dispatch(actions.changeGameMode("Simulation"));
  expect(stateContainer.dump().gameMode).toBe("Simulation");
});

it('transitions gameMode state to Arcade', async () => {
  await dispatch(actions.changeGameMode("Arcade"));
  expect(stateContainer.dump().gameMode).toBe("Arcade");
});

it('transitions country to Germany', async () => {
  await dispatch(actions.changeCountry("Germany"));
  expect(stateContainer.dump().country).toBe("Germany");
});

it('transitions vehicleType to Planes', async () => {
  await dispatch(actions.changeVehicleType("Planes"));
  expect(stateContainer.dump().vehicleType).toBe("Planes");
});
