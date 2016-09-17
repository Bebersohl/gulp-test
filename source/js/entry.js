import 'babel-polyfill';
import $ from 'jquery';
window.jQuery = $;

import './admin/admin.js';
import './homepage/homepage.js';
import './homepage/counter.js';
import './user/user.js';

import * as calculations from './global/calculations';

console.log(calculations.add(1, 2));
