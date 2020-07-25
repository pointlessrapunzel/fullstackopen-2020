describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('baseServerUrl')}/api/testing/reset`)
    cy.request('POST', `${Cypress.env('baseServerUrl')}/api/users`, {
      username: 'testuser', name: 'Test User', password: 'sekret'
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
        .find('input').type('testuser')
      cy.get('#form__password')
        .find('input').type('sekret')
      cy.get('#form--login')
        .find('button').click()

      cy.contains('Test User logged in')
    })

    it('fails', function() {
      cy.get('#form__username')
        .find('input').type('testuser')
      cy.get('#form__password')
        .find('input').type('wrong')
      cy.get('#form--login')
        .find('button').click()

      cy.get('.notification')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('testuser', 'sekret')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title')
        .type('New Test Blog')
      cy.get('#author')
        .type('New Test Author')
      cy.get('#url')
        .type('http://test-url.com')

      cy.get('#save-blog-btn').click()
      cy.contains('New Test Blog New Test Author')
    })

    describe.only('And a few blogs already exist', function() {
      beforeEach(function() {
        cy.createBlog('first blog', 'first author', 'http://blog.com')
        cy.createBlog('second blog', 'first author', 'http://blog2.com')
        cy.createBlog('first blog', 'second author', 'http://bblog.com')
          .then(() => {
            cy.visit('/')
          })
      })

      it('one of them can be liked', function() {
        cy.contains('second blog first author')
          .as('secondBlog')
          .find('button')
          .click()
        cy.get('@secondBlog')
          .contains('likes 0')
          .find('.btn--like')
          .click()
        cy.get('@secondBlog')
          .contains('likes 1')
      })
    })
  })

})