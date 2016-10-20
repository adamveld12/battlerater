import vehicles from './vehicles';

const actions = {
  changeGameMode: (mode) => ({ name: 'CHANGE_GAME_MODE', mode }),
  changeCountry: (country) => ({ name: 'CHANGE_COUNTRY', country }),
  changeVehicleType: (vehicleType) => ({ name: 'CHANGE_VEHICLE_TYPE', vehicleType }),
  addVehicleSlot: () => ({ name: 'ADD_VEHICLE_SLOT' }),
  removeVehicleSlot: (idx) => ({ name: 'REMOVE_VEHICLE_SLOT', idx }),
  setVehicleSlot: (vehicleInfo, vehicleIdx, idx) => ({ name: 'SET_VEHICLE_SLOT', vehicleInfo, vehicleIdx, idx }),
};

const changeGameMode = (state, action) => {
  let newState = state;

  if (action.name === 'CHANGE_GAME_MODE') {
      newState.gameMode = action.mode;
  }

  return newState;
};

const changeVehicleType = (state, action) => {
  let newState = state;

  const { name, vehicleType } = action;

  if (name === 'CHANGE_VEHICLE_TYPE') {
      newState.vehicleType = vehicleType;
  }

  return newState;
};

const changeCountry = (state, action) => {
  let newState = state;

  const { vehicleType } = state;
  const { name, country } = action;

  if (name === 'CHANGE_COUNTRY') {
      newState.country = country;
      newState.vehicleSlots = state.vehicleSlots.map(
        (slot) => ({ vehicleInfo: vehicles[country][vehicleType][0], vehicleIdx: 0 })
      );
  }

  return newState;
};

const changeVehicleSlot = (state, action) => {
  let newState = state;

  const { name } = action;
  const { vehicleSlots, country, vehicleType } = state;

  if (name === 'ADD_VEHICLE_SLOT') {
    newState.vehicleSlots.push({ vehicleInfo: vehicles[country][vehicleType][0], vehicleIdx: 0 });
  } else if (name === 'REMOVE_VEHICLE_SLOT') {
    const { idx } = action;

    if (!idx) {
      newState.vehicleSlots.pop();
    } else {
      newState.vehicleSlots.splice(idx, 1);
    }

  } else if (name === 'SET_VEHICLE_SLOT') {
    const { vehicleIdx, vehicleInfo, idx } = action;

    console.log("setting", idx, "to", vehicleInfo, vehicleIdx);
    vehicleSlots[idx] = { vehicleInfo, vehicleIdx };
  }

  return newState;
};

const reducers = [changeGameMode, changeVehicleType, changeCountry, changeVehicleSlot];

const initialState = {
  gameMode: 'Arcade',
  vehicleType: 'Tanks',
  country: 'USA',
  vehicleSlots: [],
};

export { actions, reducers, initialState };
