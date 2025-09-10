import { test, expect } from '@playwright/test';
import LoginAction from '../actionobjects/LoginAction';

require('dotenv').config();

const username = process.env.USERNAME;;

test('Add to and remove from cart', async ({page}) => {
    const loginAction = new LoginAction(page);

    await loginAction.login(username);

    
});