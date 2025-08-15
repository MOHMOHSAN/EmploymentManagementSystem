### Pre-requiste
- go to root directory folder
- npm install

### To Start All Application
- npm run start-all
(This will trigger json-server and vite concurrently) 
Note: To run one by one, 
    - npm run dev
    - npm run json-server

### To Run Unit Test
- npm run test

### To Run Cypress E2E Test
- npx cypress open


### Demo Screenshot
- It is saved in /<root-directory>/demoScreenshot

### Folder Strcture
-> src 
    -> configuration (Store Management with dynamic injection of reducer and saga)
    -> utils (Same functions that can be used across features)
    -> containers
     -> EmployeeManager
      -> Each Reducer,Saga,Action, constants (CRUD Operation + State Management)
      -> Components 
      
### Endpoint Configuration
-> json-server url is now currently specified with port 5000 in package.json file
    http://localhost:5000/employees
-> endpoint base_url (http://localhost:5000) is defined in src\utils\axiosInstance.js


### Further improvement
- To block if browser is refreshed or closed before saving changes 
- Cypress Testcase for listing validation, routing stage can be added
