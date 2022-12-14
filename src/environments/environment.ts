// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "src/app/models/environment-configuration";

export const environment: EnvironmentConfiguration = {
  production: false,
  env_name: "dev",
  apiUrl: "http://localhost:786",
  apiEndpoints: {
    adduser:"addUser",
    admin: "admin",
    allUsers:"allUsers",
    authenticate:"authenticate",
    deleteAllUsers:"deleteAllUsers",
    deleteUser:"deleteUser",
    updateUser:"updateUser",
    forUser:"user",
    userById:"userById",
    usersrole: "usersrole",
    addroles:"addroles",
    deleterole:"deleterole",
    getroles:"getroles",
    updaterole:"updaterole",
    totalcount:"getUsersCount",
    userscount:"getCountByRole?userRoles=User",
    admincount: "getCountByRole?userRoles=Admin",
    rolescount:"getRolesCount",
  },
  cacheTimeInMinutes: 1,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
