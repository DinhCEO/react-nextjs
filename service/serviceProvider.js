import axios from 'axios';
//todo config axios

import authService from './auth';

export let AuthService = new authService(axios);