import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { store } from './index';

export default bindActionCreators(actions, store.dispatch);
