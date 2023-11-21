describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'prototype',
      username: 'prototype',
      password: 'prototype'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#usernameInput').parent().should('contain', 'username')
    cy.get('#passwordInput').parent().should('contain', 'password')
  })
  // describe('test login', function () {
  //   it('succeeds with correct credentials', function () {
  //     cy.login({ username: 'prototype', password: 'prototype' })
  //     cy.contains('prototype logged in')
  //   })
  //   it('fails with wrong credentials', function () {
  //     cy.get('#usernameInput').type('brototype')
  //     cy.get('#passwordInput').type('prototype')
  //     cy.get('#login-button').click()
  //     cy.get('.error-msg').should('contain', 'wrong username or password')
  //     cy.get('.error-msg').should('have.css', 'color', 'rgb(255, 255, 255)')
  //     cy.get('.error-msg').should('have.css', 'border-style', 'solid')
  //   })
  // })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'prototype', password: 'prototype' })
      cy.contains('prototype logged in')
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'first note',
        author: 'first note',
        url: 'firstnote.com'
      })
      cy.createBlog({
        title: 'second note',
        author: 'second note',
        url: 'secondnote.com'
      })
      cy.createBlog({
        title: 'third note',
        author: 'third note',
        url: 'thirdnote.com'
      })
      cy.createBlog({
        title: 'fourth note',
        author: 'fourth note',
        url: 'fourthnote.com'
      })

      cy.contains('first note', { timeout: 15000 }).contains('show').click()
      cy.contains('second note', { timeout: 15000 }).contains('show').click()
      cy.contains('third note', { timeout: 15000 }).contains('show').click()
      cy.contains('fourth note', { timeout: 15000 }).contains('show').click()



      cy.contains('first note', { timeout: 15000 }).parent().contains('like').as('firstBtn')
      cy.get('@firstBtn').click()


      cy.contains('second note', { timeout: 15000 }).parent().contains('like').as('secBtn')
      cy.get('@secBtn').click()
      cy.wait(2000)
      cy.get('@secBtn').click()


      cy.contains('third note', { timeout: 15000 }).parent().contains('like').as('thirdBtn')
      cy.get('@thirdBtn').click()
      cy.wait(2000)
      cy.get('@thirdBtn').click()
      cy.wait(2000)
      cy.get('@thirdBtn').click()


      cy.contains('fourth note', { timeout: 15000 }).parent().contains('like').as('fourthBtn')
      cy.get('@fourthBtn').click()

      cy.get('@fourthBtn').click()

      cy.get('@fourthBtn').click()
      cy.wait(2000)
      cy.get('@fourthBtn').click()
      cy.wait(2000)
      cy.wait(2000)

















      // cy.visit('', { timeout: 15000 })
    })
    it('descending order', function () {
      cy.visit('')
    })


  })
})