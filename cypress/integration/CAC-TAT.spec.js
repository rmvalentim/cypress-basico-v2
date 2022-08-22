/// <reference types="Cypress" />

beforeEach(()=> {
    cy.visit('./src/index.html')
})

function typeRequiredFieldsCorrectly() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Valentim')
    cy.get('#email').type('rafael@sap.com')
    cy.get('#open-text-area').type('Esse é um exemplo de texto livre')
}

describe('Central de Atendimento ao Cliente TAT', () => {
    
    it('verifica o título da aplicação', () => {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        typeRequiredFieldsCorrectly()
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Valentim')
        cy.get('#email').type('ASDF')
        cy.get('#open-text-area').type('Esse é um exemplo de texto livre')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    
    it('Verifica se o input telefone permanece vazio quando digitamos valor não numérico', () => {
        cy.get('#phone').type('ABCD').should('be.empty')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        typeRequiredFieldsCorrectly()
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        typeRequiredFieldsCorrectly()
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#open-text-area').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Valida mensagem de sucesso quando o formulário é corretamente enviado', () => {
        typeRequiredFieldsCorrectly()
        cy.contains('.success', 'Mensagem enviada com sucesso.')
    })

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento (Feedback)', () => {
        cy.get('input[type="radio"]')
          .check('feedback')
          .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .each((radio) => {
            cy.wrap(radio).check().should('be.checked')
          })          
    })

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .each((box) => {
            cy.wrap(box).should('be.checked')
          })
          .last()
          .uncheck()
          .should('not.be.checked')
    })    

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
          .selectFile('./cypress/fixtures/example.json')
          .then((input) => {
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
          .then((input) => {
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.get('input[type="file"]')
          .selectFile({
            contents: 'cypress/fixtures/example.json',
            fileName: 'file.png',
          })
          .then((input) => {
            expect(input[0].files[0].name).to.equal('file.png')
          })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a')
          .invoke('removeAttr', 'target')
          .click()
        
        cy.contains('#title', 'CAC TAT - Política de privacidade')
    })
})