describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('baseServerUrl')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('baseServerUrl')}/api/users`, {
      username: 'root', name: 'Test User', password: 'sekret'
    })
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#form--login')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#form__username')
        .find('input').type('root')
      cy.get('#form__password')
        .find('input').type('sekret')
      cy.get('#form--login')
        .find('button').click()

      cy.contains('Test User logged in')
    })

    it('fails', function() {
      cy.get('#form__username')
        .find('input').type('root')
      cy.get('#form__password')
        .find('input').type('wrong')
      cy.get('#form--login')
        .find('button').click()

      cy.get('.notification')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })


})