# Complaint System API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You must have a Node JS environment for this you need to install node via package manager
https://nodejs.org/en/download/package-manager/

install grunt-cli globally by running the following command

```
npm install -g grunt-cli
```

Install node_module locally by running command

```
npm install
```

Install the MySQL server by using the Ubuntu package manager:

```
sudo apt-get update sudo apt-get install mysql-server
```

## Running

Open terminal window, go to the project folder and run the following command

```
npm run grunt
```

For grunt watch

```
npm run grunt watch
```

Open terminal window, go to the project folder and run the following command

```
npm start
```

## Usage

* ### Configuration

  * **GET /configurations**

        * Retreive data of configurations type.

        * Response : [{Configuration}... | error]

  * **POST /configuration**

        * Retreive data of all configurations.

        * Response : [{Configuration}... | error]

  * **POST /configuration/add**

        * Inserting single configuration data

        * Request : {Configuration}

        * Response : {success | error}

  * **PUT /configuration/edit/:id**

        * Updating single configuration data

        * Request : {Configuration}

        * Response : {success | error}

  * **DELETE /configuration/delete**

        * Deleting single configuration data

        * Request : id

        * Response : {success | error}

* ### Employee

  * **GET /employees**

        * Retreive data of all employees.

        * Response : [{Employee}... | error]

  * **GET /employee/:id**

        * Retreive data of single employee.

        * Response : [{Employee}... | error]

  * **POST /employee/add**

        * Inserting single employee data

        * Request : {Employee}

        * Response : {success | error}

  * **PUT /employee/edit/:id**

        * Updating single employee data

        * Request : {Employee}

        * Response : {success | error}

  * **DELETE /employee/delete**

        * Deleting single employee data

        * Request : id

        * Response : {success | error}

* ### Complaint

  * **GET /complaints**

        * Retreive data of all complaints.

        * Response : [{Complaint}... | error]

  * **GET /complaint/:id**

        * Retreive data of single complaint.

        * Response : [{Complaint}... | error]

  * **POST /complaint/add**

        * Inserting single complaint data

        * Request : {Complaint}

        * Response : {success | error}

  * **DELETE /complaint/delete**

        * Deleting single complaint data

        * Request : id

        * Response : {success | error}

* ### Assignment

  * **GET /assignments**

        * Retreive data of all assignments.

        * Response : [{Assignment}... | error]

  * **GET /assignment/:id**

        * Retreive data of single assignment.

        * Response : [{Assignment}... | error]

  * **POST /assignment/add**

        * Inserting single assignment data

        * Request : {Assignment}

        * Response : {success | error}

  * **DELETE /assignment/delete**

        * Deleting single assignment data

        * Request : id

        * Response : {success | error}

* ### Note

  * **GET /notes**

        * Retreive data of all notes.

        * Response : [{Note}... | error]

  * **GET /note/:id**

        * Retreive data of single note.

        * Response : [{Note}... | error]

  * **POST /note/add**

        * Inserting single note data

        * Request : {Note}

        * Response : {success | error}

  * **PUT /note/edit/:id**

        * Updating single note data

        * Request : {Note}

        * Response : {success | error}

  * **DELETE /note/delete**

        * Deleting single note data

        * Request : id

        * Response : {success | error}
        
## RBAC

  * ### User

   * **GET /users**

        * Retrieve list of all users.

        * Response : [{ User }, ...] | error

   * **GET /user/:id**

        * Retrieve data of a user.

        * Response : { User } | error

   * **GET /user/detail/:id**

        * Retrieve data of a  user with its permissions, group and role.

        * Response : { User, [{ Permission }, ...], [{ Group }, ...], [{ Role }, ...] } | error

   * **GET /user/permission/:id**

        * Retrieve all permissions of a user which are directly assigned to him and/or assigned to his group or role.

        * Response : { User, [{ Permission }, ...] } | error

   * **GET /user/count**

        * Count all users.

        * Response : Number | error

   * **POST /user/create**

        * Creates a user

        * Request : { userId: number, createdBy: number }

        * Response : { success | error }

   * **PUT /user/edit/:id**

        * Updates a user

        * Request : { User }

        * Response : { success | error }

   * **DELETE /user/delete/:id**

        * Deletes a user

        * Response : { success | error }

  * ### Group

   * **GET /groups**

        * Retrieve list of all groups.

        * Response : [{ Group }, ...] | error

   * **GET /group/:id**

        * Retrieve data of a group.

        * Response : { Group } | error

   * **GET /group/detail/:id**

        * Retrieve data of a  group with its permissions and roles assigned to him.

        * Response : { Group, [{ Permission }, ...], [{ Role }, ...] } | error

   * **GET /group/count**

        * Count all groups.

        * Response : Number | error

   * **POST /group/create**

        * Creates a group

        * Request : { name: string, createdBy: number }

        * Response : { success | error }

   * **PUT /group/edit/:id**

        * Updates a group

        * Request : { Group }

        * Response : { success | error }

   * **DELETE /group/delete/:id**

        * Deletes a group

        * Response : { success | error }

  * ### Role

   * **GET /roles**

        * Retrieve list of all roles.

        * Response : [{ Role }, ...] | error

   * **GET /role/:id**

        * Retrieve data of a role.

        * Response : { Role } | error

   * **GET /role/detail/:id**

        * Retrieve data of a  role with its permissions.

        * Response : { Role, [{ Permission }, ...] | error

   * **GET /role/count**

        * Count all roles.

        * Response : Number | error

   * **POST /role/create**

        * Creates a role

        * Request : { name: string, createdBy: number }

        * Response : { success | error }

   * **PUT /role/edit/:id**

        * Updates a role

        * Request : { Role }

        * Response : { success | error }

   * **DELETE /role/delete/:id**

        * Deletes a role

        * Response : { success | error }

  * ### UserGroup

   * **POST /user-group/create**

        * Add user to a group

        * Request : { userId: number, groupId: number, createdBy: number }

        * Response : { success | error }

   * **DELETE /role-assignment/user**

        * Delete user from a group

        * Request : { userId: number, groupId: number }

        * Response : { success | error }

  * ### RoleAssignmentgroup

   * **POST /role-assignment/user**

        * Assign role to a user

        * Request : { userId: number, roleId: number, createdBy: number }

        * Response : { success | error }

   * **POST /role-assignment/group**

        * * Assign role to a group

        * Request : { groupId: number, roleId: number, createdBy: number }

        * Response : { success | error }

   * **DELETE /role-assignment/user**

        * Revoke role from a user

        * Request : { userId: number, roleId: number }

        * Response : { success | error }

   * **DELETE /role-assignment/group**

        * Revoke role from a group

        * Request : { groupId: number, roleId: number }

        * Response : { success | error }


  * ### AppFeature

   * **GET /app-features**

        * Retrieve list of all app-features.

        * Response : [{ AppFeature }, ...] | error

   * **GET /app-feature/parents**

        * Retrieve list of all grand parent app-features.

        * Response : [{ AppFeature }, ...] | error

   * **GET /app-feature/children/:id**

        * Retrieve data of chilren and nested children of a parent app-feature.

        * Response : { AppFeature, [{ AppFeature }, ...] | error

   * **GET /app-feature/count**

        * Count all app-features.

        * Response : Number | error

   * **POST /app-feature/create**

        * Creates an app-feature

        * Request : { name: string, type: string, parentId: number | null, createdBy: number }

        * Response : { success | error }

   * **PUT /app-feature/edit/:id**

        * Updates an app-feature

        * Request : { AppFeature }

        * Response : { success | error }

   * **DELETE /app-feature/delete/:id**

        * Deletes an app-feature

        * Response : { success | error }


  * ### FeaturePermission

   * **POST /feature-permission/user**

        * Grant permission to user

        * Request : { userId: number, featureId: number, createdBy: number }

        * Response : { success | error }

   * **POST /feature-permission/group**

        * Grant permission to group

        * Request : { groupId: number, featureId: number, createdBy: number }

        * Response : { success | error }

   * **POST /feature-permission/role**

        * Grant permission to role

        * Request : { roleId: number, featureId: number, createdBy: number }

        * Response : { success | error }

   * **DELETE /feature-permission/user**

        * Revoke permission from user

        * Request : { userId: number, featureId: number }

        * Response : { success | error }


   * **DELETE /feature-permission/group**

        * Revoke permission from group

        * Request : { groupId: number, featureId: number }

        * Response : { success | error }


   * **DELETE /feature-permission/role**

        * Revoke permission from role

        * Request : { roleId: number, featureId: number }

        * Response : { success | error }



## Help

If you phase any issue related MySql Server Permission
Run following command in MySql Terminal to set authentication_string

```
use mysql;

update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';
```

now restart MySql service by running following command from Terminal

```
sudo service mysql restart
```
