import { history } from '../store';
import is from 'is_js';

export const redirect = (path) => {
    history.push(path);
};
