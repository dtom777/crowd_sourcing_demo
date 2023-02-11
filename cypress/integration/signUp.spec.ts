/* eslint-disable */

describe('SignUp', async () => {
  before(() => {
    const body = {
      email: 'e2e@example.com',
      password: '11111111',
    };
    fetch('http://localhost:3000/api/user/deleteUser', {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    cy.visit('/auth/signup');
  });
  it('successfully signUp', () => {
    const name = 'e2e';
    const email = 'e2e@example.com';
    const password = '11111111';
    cy.get('[data-testid="signUpByEmail"]').click();
    cy.url().should('eq', 'http://localhost:3000/auth/signup/email');
    cy.get('select').select('ねこ１');
    cy.get('input[type=text]').type(name);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('[data-testid="checkbox"]').click();
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="spinner"]').should('be.visible');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('SignUp', async () => {
  before(() => {
    cy.visit('/auth/signup');
  });
  it('failed signUp with email and password', () => {
    const name = 'e2e';
    const email = 'e2e@example.com';
    const password = '11111111';
    cy.get('[data-testid="signUpByEmail"]').click();
    cy.url().should('eq', 'http://localhost:3000/auth/signup/email');
    cy.get('select').select('ねこ１');
    cy.get('input[type=text]').type(name);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('[data-testid="signUp"]').click();
    cy.get('[data-testid="errorMessage"]').contains('チェックしてください。');
  });
});
