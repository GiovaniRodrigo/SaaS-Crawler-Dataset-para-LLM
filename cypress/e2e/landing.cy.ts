describe('DataCrawl Landing Page', () => {
  it('should display the main headline and CTA', () => {
    cy.visit('/')

    // Check brand
    cy.contains('DataCrawl').should('be.visible')

    // Check headline
    cy.contains('Transforme sites em datasets prontos para LLM').should('be.visible')

    // Check CTA
    cy.contains('a', 'Começar agora').should('be.visible')
  })

  it('should navigate to login page', () => {
    cy.visit('/')
    cy.contains('a', 'Entrar').click()
    
    cy.url().should('include', '/login')
    cy.contains('Entrar na conta').should('be.visible')
  })
})

describe('DataCrawl Login Page', () => {
  it('should display login form fields', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('button', 'Entrar').should('be.visible')
  })
})
