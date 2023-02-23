it('displays correct heading when navigating to shows route', () => {
  cy.visit('/');
  cy.findByRole('heading', { name: /new arrivals/i }).should('exist');
});

it('displays name for post that was not present at build time', () => {
  const postId = 'e6aa0575-2c25-ed54-6ea2-35a34c55539c';
  const newPost = generateNewPost(postId);
  cy.visit(`/posts/${postId}`);
  cy.findByRole('heading', { name: /Avalanche of Cheese/i }).should('exist');
});
