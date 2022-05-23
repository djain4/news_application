"use strict";

import { fetchAsync } from "./http-request.js";
import {
  JSON_DATA_FILE,
} from "./const.js";

window.onload = () => {
    fetchAsync(JSON_DATA_FILE).then((data) => {})
    .catch((reason) => console.log(reason.message));
}