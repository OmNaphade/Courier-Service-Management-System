describe('Home Page', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', 'localhost:3000')
  })
})
