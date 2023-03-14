describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND_URL')}/users/`, user)
    cy.visit('')
  })

  it('login fails with wrong password', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'A new blog',
        author: 'Miguel Rocha',
        url: 'http://mrocha.com'
      })
      cy.contains('A new blog')
    })

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'A new blog',
        author: 'Miguel Rocha',
        url: 'http://mrocha.com'
      })
      cy.get('#view-button').click()
      cy.get('#like-button').click()
    })

    it('a blog can be deleted', function () {
      cy.createBlog({
        title: 'A new blog',
        author: 'Miguel Rocha',
        url: 'http://mrocha.com'
      })
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.contains('A new blog').should('not.exist')
    })
  })

  // describe('Deleting a blog', function () {
  //   beforeEach(function () {
  //     const user = {
  //       name: 'Matti Luukkainen',
  //       username: 'mluukkai',
  //       password: 'salainen'
  //     }
  //     cy.request('POST', `${Cypress.env('BACKEND_URL')}/users/`, user)
  //     cy.login({ username: 'mluukkai', password: 'salainen' })
  //   })

  //   it('user cannot delete blog created by another user', function () {
  //     const user2 = {
  //       name: 'Jimbo Baggins',
  //       username: 'jbaggins',
  //       password: 'ringismine'
  //     }
  //     cy.request('POST', `${Cypress.env('BACKEND_URL')}/users/`, user2)

  //     cy.createBlog({
  //       title: 'A new blog',
  //       author: 'Miguel Rocha',
  //       url: 'http://mrocha.com'
  //     })

  //     cy.contains('Log out').click()

  //     cy.login({ username: 'jbaggins', password: 'ringismine' })

  //     cy.get('#view-button').click()

  //     cy.get('#remove-button').should('not.exist')
  //   })
  // })

})