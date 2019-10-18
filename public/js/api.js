/* eslint-disable no-unused-vars */

/**
 * Date: 2019-10-9
 * requestFromApi is used to request data from the api at the given path and return the result as an object (or a string).
 * 
 * @param {string} path is the pathname that you want to request data from (example: '/api/employees/1').
 * @param {boolean} stringified Set this to true if you want the output to be converted into a string. 
 */
async function requestFromApi(path, stringified = false) {
    const newPath = window.location.origin.concat(path);
    const promise = await fetch(newPath);
    const jsonResponse = await promise.json();
    
    if (!stringified) {
        return jsonResponse;
    } else {
        return JSON.stringify(jsonResponse);
    }
}

/**
 * Date: 2019-10-9
 * insertIntoClass is used to overwrite the content of a specific dom object. For example change the inner content of a div with the class 'template' attached to it from 'template text' to 'Hello world'.
 * 
 * @param {string} className represents the class name of the dom object we are looking to edit.
 * @param {string} string contains the new content that we want to use when replacing the old content.
 * @return {obj} 'ok'.
 */
function insertIntoClass(className, string) {
    const domObj = document.querySelector(`.${className}`);
    domObj.innerHTML = '';
    domObj.innerHTML = string;
    return 'ok';
}

/**
 * Use displayValue to request data from a certain api route and insert the stringified response into a dom object of class 'diplay'. 
 * 
 * @param {string} path is the path to our api route from which we want to request information.
 */
async function displayValue(path) {
    const responseString = await requestFromApi(path, true);
    insertIntoClass('display', responseString);
}

/**
 * Use patch to edit an existing employee. This function sends a request to the api to edit the value name and phone of an existing employee in the database.
 * 
 * @param {int} id The id of the employee to edit.
 * @param {string} name The new name of the employee.
 * @param {number} phone The new phone number of the employee.
 */
async function patch(id, name, phone) {
    const newPath = window.location.origin.concat('/api/employees/:id');
    const response = await fetch(newPath, {
        method: 'PUT',
        body: JSON.stringify({id: id, name: name, phone: phone}),
    });

    return await response.json;
}

/**
 * Use create to add a new employee. By calling this function you send an api request to create a new employee using the provided name and phone number.
 * 
 * @param {int} id  The id of the employee. Shouldn't be required, please change. 
 * @param {string} name The name of the employee to create.
 * @param {number} phone The phone number of the employee to create.
 */
async function create(id, name, phone) {
    const newPath = window.location.origin.concat('/api/employees/:id');
    const response = await fetch(newPath, {
        method: 'POST',
        body: JSON.stringify({id: id, name: name, phone: phone}),
    });

    return await response.json;
}

/**
 * Use delete_employee to remove an existing employee with the given id. By calling this function you will send an api request to delete the first employee that corresponds to the provided id.
 * 
 * @param {int} id The id of the employee you want to create.
 */
async function deleteEmployee(id) {
    const newPath = window.location.origin.concat('/api/employees/:id');
    const response = await fetch(newPath, {
        method: 'DELETE',
        body: JSON.stringify({id: id}),
    });

    return await response.json;
}

/**
 * Use loadEmployees to create employee cards for each and every employee.  This function will request a list of employees from the api and loop over each element and append a new dom object with the employee name and image for each of the employees.
 * 
 * For this function to work the current page requires:
 * A card container(div) with the class 'employees'.
 * A template element containing a div with the class 'card' containing a p and an img element.
 */
async function loadEmployees() {
    const employees = await requestFromApi('/api/employees');
    const cardContainer = document.querySelector('.employees');
    const template = document.querySelector('template');
    for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];
        
        const clone = document.importNode(template.content, true);
        const domObj = clone.querySelector('.card');

        domObj.querySelector('p').innerHTML = employee.name;
        domObj.querySelector('img').src = `/img/${employee.img}.jpg`;

        cardContainer.appendChild(clone);
    }

    return employees;
}
