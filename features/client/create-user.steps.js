const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const axios = require('axios')

let userData
let response

Given('that I provide valid user data:', function (dataTable) {
  userData = dataTable.rowsHash()
})

When('I send a POST request to {string} with the data', async function () {
  try {
    response = await axios.post('http://localhost:3000/api/v1/users', userData)
  } catch (error) {
    response = error.response
  }
})

Then(
  'I should receive a status code {int} with the data',
  function (statusCode) {
    assert.strictEqual(response.status, statusCode)
    assert.deepStrictEqual(response.data, userData)
  }
)
