export const APP_NAME = 'DIGITAL KNOWLEDGE NETWORK';
export const SERVER_PORT = 8089;
export const ENVIRONMENT = "development";
export const CLIENT_URL = window.location.origin;
export const DEV_SERVER_URL = "http://localhost:8089";
export const SERVER_URL = window.location.origin + ":" + SERVER_PORT;
export const BASE_URL = (ENVIRONMENT ==='development') ? DEV_SERVER_URL : SERVER_URL
