import { EnvironmentConfiguration } from "src/app/models/environment-configuration";

export const environment: EnvironmentConfiguration = {
  production: true,
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
