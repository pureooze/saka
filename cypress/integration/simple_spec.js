Cypress.Commands.add(
  'iframe',
  { timeout: 2000, prevSubject: 'element' },
  $iframe => {
    console.log('Working...');
    return new Cypress.Promise(resolve => {
      console.log('Resolved...', $iframe.contents().find('body'));
      resolve($iframe.contents().find('body'));
      $iframe.on('load', () => {
        console.log('iframe loaded');
      });
    });
  }
);

Cypress.Commands.add('discardIframe', selector => {
  cy.get(`iframe${selector || ''}`).then(f => {
    f.contents()[0].__STALE = true;
  });
});

Cypress.on('window:before:load', win => {
  Object.defineProperty(win, 'self', {
    get: () => {
      return window.top;
    }
  });
});

// Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
//   return new Cypress.Promise(resolve => {
//     resolve($iframe.contents().find('body'));
//     $iframe.on('load', () => {});
//   });
// });

describe('My First Test', () => {
  it('Does not do much!', () => {
    //chrome-extension://nbdfpcokndmapcollfpjdpjlabnibjdi/saka.html
    cy.visit('http://localhost:15002/', {
      onBeforeLoad: win => {
        Object.defineProperty(win, 'self', {
          get: () => {
            return window.top;
          }
        });
      }
    });
    cy.get('iframe').then($iframe => {
      const doc = $iframe.contents();
      //   console.log('Doc: ', doc.find('input'));
      doc.find('input').click(() => {
        console.log('it worked...');
      });
      cy.wrap(doc.find('input')).click({ force: true });
    });
    // cy.discardIframe('.extension');
    // cy.get('.extension').as('iframe');
    // cy.get('@iframe').find('input');
    // cy
    //   .get('.extension')
    //   .iframe()
    //   .find('input')
    //   .type('Hello, World');
    // cy.get('input').type('Hello, World');
  });
});
