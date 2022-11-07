Cypress.Commands.add('login', (username,password) => {
    console.log(username,password,'LOOK HERE HERE')
    cy.request('POST', 'http://localhost:3003/api/login/', {
      username:username, password:password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      
    })
    cy.get('input:first').type(username)
    cy.get('input:last').type(password)
    cy.contains('login').click()
  })
  Cypress.Commands.add('createBlog', ({ author,title,url }) => {
   
      cy.contains('newblog').click()
      cy.get('#author').type(author)
      cy.get('#title').type(title)
      cy.get('#url').type(url)
      cy.contains('create').click()
      
  })

  Cypress.Commands.add('postBlog', ({author,title,url,likes}) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: {author, title, url, likes},
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
  })