export interface EnvironmentConfiguration {
  env_name: string;
  production: boolean;
  apiUrl: string;
  apiEndpoints: {
    adduser: string;
    admin: string;
    allUsers: string;
    authenticate: string,
    deleteAllUsers:string,
    deleteUser: string,
    updateUser: string,
    forUser: string,
    userById: string,
    usersrole: string,
    addroles: string,
    deleterole:string,
    getroles: string,
    updaterole: string,
    totalcount: string,
    userscount: string,
    admincount: string,
    rolescount: string,
  },
  cacheTimeInMinutes: number;
}
