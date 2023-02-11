/* eslint-disable */

describe('Navigation', () => {
  it('should navigate to the category first page', () => {
    cy.visit('/');
    cy.get('a[href="/category/living"]').first().click({ force: true });
    cy.url().should('include', '/category/living');
    cy.get('li').contains('育児');
  });
});
