/// <reference types="Cypress" />

beforeEach(()=> {
    cy.visit('./src/privacy.html')
})

describe('Politica de Privacidade', () => {

    it('Verifica existência do titulo da política de privacidade', () => {
        cy.contains('#title', 'CAC TAT - Política de privacidade')
    })
})