import { combineReducers } from 'redux';

import getWeatherReducer from './getWeatherReducer';

const rootReducer = combineReducers({
  getWeatherReducer
});

export default rootReducer;