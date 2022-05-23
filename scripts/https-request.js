"use strict";

import { PORT, BASE_URL } from "./const.js";

// async function
export async function fetchAsync(urlPath) {
  // await response of fetch call
  let response = await fetch(`${BASE_URL}:${PORT}/${urlPath}`);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}