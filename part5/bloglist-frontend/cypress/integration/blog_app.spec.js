describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('baseServerUrl')}/api/testing/reset`)
    cy.createUser('testuser', 'Test User', 'sekret')
    cy.createUser('testuser2', 'Test User 2', 'sekret2')
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
        cy.createBlog('first blog', 'first author', 'http://blog.com', 4)
        cy.createBlog('second blog', 'first author', 'http://blog2.com', 10)
        cy.createBlog('first blog', 'second author', 'http://bblog.com', 5)
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
          .contains('likes 10')
          .find('.Blog__btn-like')
          .click()
        cy.get('@secondBlog')
          .contains('likes 11')
      })

      it('can delete blogs if the creator', function() {
        cy.contains('second blog first author')
          .as('secondBlog')
          .contains('view')
          .click()
        cy.get('@secondBlog')
          .find('.Blog__btn-delete')
          .click()

        cy.get('html').should('not.contain', 'second blog first author')
      })

      it.only('the blogs are sorted by likes', function() {
        cy.get('.Blog')
          .then($blogs => {
            for (let i = 0; i < $blogs.length; i++) {
              cy.wrap($blogs[i]).find('button').click()
            }
            cy.wrap($blogs[0]).contains('10')
            cy.wrap($blogs[1]).contains('5')
            cy.wrap($blogs[2]).contains('4')
          })
      })
    })
  })

  describe('When logged in and other users created blogs exist', function() {
    beforeEach(function() {
      cy.login('testuser2', 'sekret2')
      cy.createBlog('blog by another user', 'author', 'http://url')
      cy.clearLocalStorage('loggedUser')
      cy.login('testuser', 'sekret')
    })

    it('can not delete blogs if not the creator', function() {
      cy.contains('blog by another user')
        .as('blog')
        .contains('view')
        .click()
      cy.get('@blog')
        .find('.Blog__btn-delete').should('not.exist')
    })
  })

})