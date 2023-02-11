/* eslint-disable */

describe('SignIn', () => {
  before(() => {
    cy.visit('/auth/signin');
  });
  it('successfully signIn with email and password', () => {
    const email = 'e2e@example.com';
    const password = '11111111';
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('[data-testid="signInByEmailAndPassword"]').click();
    cy.get('[data-testid="spinner"]').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('SignIn', () => {
  before(() => {
    cy.visit('/auth/signin');
  });
  it('failed signIn with email and password', () => {
    const email = 'e2e@example.com';
    const password = '22222222';
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('[data-testid="signInByEmailAndPassword"]').click();
    cy.get('[data-testid="spinner"]').should('be.visible');
    cy.get('[data-testid="errorMessage"]').contains(
      'メールアドレスまたはパスワードが正しくありません'
    );
  });
});
