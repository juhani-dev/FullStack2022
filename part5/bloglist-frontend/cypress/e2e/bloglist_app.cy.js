describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'eikka',
      username: 'ensi',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    
    
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      
      cy.get('input:first').type('ensi')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('ensi is logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('input:first').type('ensi')
      cy.get('input:last').type('salai')
      cy.contains('login').click()
      cy.get('.error').should('have.css' ,'color', 'rgb(255, 0, 0)')

    })
  })
    describe('add blog',function() {
    it('succeeds creating blog', function() {
      cy.login('ensi','salainen')
      cy.contains('ensi is logged in')
      cy.contains('newblog').click()
      cy.get('#author').type('whodonit')
      cy.get('#title').type('blogger')
      cy.get('#url').type('www.www')
      cy.contains('create').click()
      cy.contains('blogger')
      cy.contains('view blog info')

    })
    it('succeeds liking a blog', function() {
      cy.login('ensi','salainen')
      cy.createBlog({author:'blogger',title:'theblog',url:'www.www' })
      cy.contains('view blog info').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')


    })
    it('succeeds removing a blog', function() {
      cy.login('ensi','salainen')
      cy.createBlog({author:'blogger',title:'theblog',url:'www.www',likes:2 })
      cy.contains('view blog info').click()
      cy.contains('blogger' && 'theblog' && 'www.www')
      cy.contains('remove').click()
      cy.contains('blogger' && 'theblog' && 'www.www').should('not.exist')

    })
    it('unauhtorized user cant remove a blog', function() {
      cy.login('ensi','salainen')
      cy.createBlog({author:'blogger',title:'theblog',url:'www.www',likes:2 })
      const user = {
        name: 'jevgeni',
        username: 'putler',
        password: 'salai'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.contains('logout').click()
      cy.login('putler','salai')
      cy.contains('view blog info').click()
      cy.contains('blogger' && 'theblog' && 'www.www')
      cy.contains('remove').should('not.exist')


    })
    it('blogs with most likes is at the top', function() {

      cy.login('ensi','salainen')
      cy.postBlog({author:'elpaso',title:'hoover',url:'www.www2',likes:50 })
      cy.postBlog({author:'mexico',title:'york',url:'www.www2',likes:10 })
      cy.postBlog({author:'texas',title:'austin',url:'www.www2',likes:100 })
      cy.createBlog({author:'blogger',title:'theblog',url:'www.www' })
      cy.wait(2000)
      cy.get('.showContent').each(($ele) => {
        cy.wrap($ele).find('button').contains('view blog info').click()

      })
      cy.get('.blogInfo').eq(0).should('contain', 'austin').and('contain', '100')
      cy.get('.blogInfo').eq(1).should('contain', 'hoover').and('contain', '50')
      cy.get('.blogInfo').eq(3).should('contain', 'theblog').and('contain', '0')
    })
  })

})