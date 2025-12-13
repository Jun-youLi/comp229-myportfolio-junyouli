describe("Portfolio smoke test", () => {
  it("loads home and navigates to Projects", () => {
    cy.visit("/");

    // if your navbar has "Projects"
    cy.contains(/projects/i).click();

    // allow either /projects or hash routing
    cy.url().should("match", /projects/i);

    // basic assertion: page has Projects heading/text
    cy.contains(/projects/i).should("be.visible");
  });
});
