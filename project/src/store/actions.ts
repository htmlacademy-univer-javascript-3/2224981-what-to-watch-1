import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction<string>('sync/app/redirect');
