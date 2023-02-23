it('completes the post create flow, starting not signed in', () => {
  cy.visit('/');

  cy.findByRole('link', { name: /sign in/i }).should('exist');

  cy.findByRole('button', { name: /sign out/i }).should('not.exist');

  cy.get('a[href="/auth/signin"]').click();
  cy.url().should('eq', 'http://localhost:3000/auth/signin');

  cy.signIn(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_PASSWORD'));

  cy.url().should('eq', 'http://localhost:3000/');

  cy.get('.avatar').click();

  cy.get('a[href="/create"]')
    .contains(/create post/i)
    .click();
  cy.url().should('eq', 'http://localhost:3000/create');

  cy.get('input[name=title]').type('test-post-title');
  cy.get('textarea[name=content]').type('test-post-content');
  cy.get('select[name=categorySlug]').select('programming');
  cy.get('input[name=reward]').type(10000);

  cy.get('button[type=submit]')
    .contains(/create/i)
    .click();

  cy.url().should('eq', 'http://localhost:3000/mypage/posts');

  cy.get('.avatar').click();

  cy.findByRole('button', { name: /sign out/i }).click();
  cy.findByRole('link', { name: /sign in/i }).should('exist');
});
