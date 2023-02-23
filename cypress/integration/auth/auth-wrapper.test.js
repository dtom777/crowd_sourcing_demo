it('runs auth flow for successful login to protected my page', () => {
  cy.visit('/');

  cy.findByRole('link', { name: /sign in/i }).should('exist');

  cy.findByRole('button', { name: /sign out/i }).should('not.exist');

  cy.get('a[href="/auth/signin"]').click();
  cy.url().should('eq', 'http://localhost:3000/auth/signin');

  cy.get('input[type=email]').clear().type(Cypress.env('TEST_USER_EMAIL'));
  cy.get('input[type=password]').clear().type(Cypress.env('TEST_PASSWORD'));

  cy.findByRole('button', { name: /sign in/i }).click();

  cy.findByRole('button', { name: /sign in/i }).should('not.exist');
  cy.get('.avatar').click();
  cy.findByRole('button', { name: /sign out/i }).should('exist');

  cy.get('a[href="/mypage"]').click();
  cy.url().should('eq', 'http://localhost:3000/mypage');
});

it('runs auth flow for failure login to protected my page', () => {
  cy.visit('/');

  cy.findByRole('link', { name: /sign in/i }).should('exist');

  cy.findByRole('button', { name: /sign out/i }).should('not.exist');

  cy.get('a[href="/auth/signin"]').click();
  cy.url().should('eq', 'http://localhost:3000/auth/signin');

  // enter invalid sign-in credentials
  cy.get('input[type=email]').clear().type('test-test@test');
  cy.get('input[type=password]').clear().type('test-test');

  cy.findByRole('button', { name: /sign in/i }).click();

  cy.findByText(/user does not exist/i).should('exist');

  // enter valid sign-in credentials
  cy.get('input[type=email]').clear().type(Cypress.env('TEST_USER_EMAIL'));
  cy.get('input[type=password]').clear().type(Cypress.env('TEST_PASSWORD'));

  cy.findByRole('button', { name: /sign in/i }).click();

  cy.findByRole('button', { name: /sign in/i }).should('not.exist');
  cy.get('.avatar').click();
  cy.findByRole('button', { name: /sign out/i }).should('exist');

  cy.get('a[href="/mypage"]').click();
  cy.url().should('eq', 'http://localhost:3000/mypage');
});

it('redirects to sign-in for protected pages', () => {
  cy.fixture('protected-pages.json').then((urls) => {
    urls.forEach(($url) => {
      cy.visit($url);
      cy.get('input[type=email]').should('exist');
      cy.get('input[type=password]').should('exist');
    });
  });
});

it('does not show sing-in page when already signed in', () => {
  cy.signIn(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_PASSWORD'));

  cy.visit('/auth/signin');

  cy.get('input[type=email]').should('not.exist');
  cy.get('input[type=password]').should('not.exist');
});
