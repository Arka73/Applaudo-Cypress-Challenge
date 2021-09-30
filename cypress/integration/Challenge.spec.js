describe('Applaudo-challenge', () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php')
  })
  it('Add an item to the cart and remove it', () => {
      // We assert that there is no item in the cart
      cy.get('.shopping_cart').find('.products').should('not.exist')
      // We add the first item to the cart without focusing on a particular item
      cy.contains('Add to cart').click()
      cy.wait(4000)
      // We assert that the adding action was successfull
      cy.get('.icon-ok').parents('h2').should('contain', 'Product successfully added to your shopping cart')
      cy.contains('Continue shopping').click()
      cy.get('[title="View my shopping cart"]').trigger('mouseover')
      // We assert that there are products in the cart
      cy.get('.shopping_cart').find('.products').should('exist')
      cy.get('.ajax_cart_block_remove_link').click()
      // By checking that there is no item, again, we can be sure that we succesfully removed it
      cy.get('.shopping_cart').find('.products').should('not.exist')
  })

  it('Search for an unvalid and a valid item', () => {
      // We type and search for an item that doesn't exist
      cy.get('.search_query').type(`B{enter}`)
      // We assert it can't be found
      cy.get('.alert').should('contain', 'No results were found for your search')
      // We type and search for an item that exists
      cy.get('.search_query').type(`louse{enter}`)
      // We assert that there are results for our search
      cy.get('.product-count').should('contain', 'Showing 1 - 1 of 1 item')
  })

  it('Verify the store information', () => {
      // We scroll-down to the bottom of the page
      cy.scrollTo('bottom')
      // We assert all the store information.
      cy.get('.icon-map-marker').parents('li')
          .should('contain', 'Selenium Framework, Research Triangle Park,')
          .should('contain', 'North Carolina,')
          .should('contain', 'USA')
      cy.get('#block_contact_infos').find('.icon-phone').parents('li').should('contain', '(347) 466-7432')
      cy.get('.icon-envelope-alt').parents('li').should('contain', 'support@seleniumframework.com')
  })
})
