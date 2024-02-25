const firstPlayerName = "Player 1";
const secondPlayerName = "Player 2";
const howManyTimePlay = [1, 2, 3]

describe('play game for single player', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
        cy.intercept('GET', 'https://www.swapi.tech/api/people/*').as('loadPerson');
        cy.intercept('GET', 'https://www.swapi.tech/api/starships/*').as('loadStarship');
    })

    it('Three times play game with person card', () => {
        cy.get('#mat-radio-2-input').check();
        cy.get('#mat-radio-5-input').check();
        howManyTimePlay.forEach(item => {
            cy.get('#playGame').click();
            cy.wait('@loadPerson');
            cy.get('app-person-card').should('have.length', 2);
            let firstMass = null;
            let secondMass = null;
            cy.get(`[id="personMass${firstPlayerName}"] > b`).invoke('text').then((first) => {
                firstMass = isNaN(Number(first)) ? 0 : Number(first);
                cy.get(`[id="personMass${secondPlayerName}"] > b`).invoke('text').then((second) => {
                    secondMass = isNaN(Number(second)) ? 0 : Number(second);
                    let winnerName = null;
                    if (first === second) {
                        winnerName = null;
                        cy.get('#winnerDraw > b');
                    } else {
                        winnerName = firstMass > secondMass ? firstPlayerName : secondPlayerName;
                        cy.get('#winnerName > b').invoke('text').then(winner => {
                            expect(winner).to.equal(winnerName);
                        })
                    }
    
                });
            });
        })
    })

    it('Play game with starship card', () => {
        cy.get('#mat-radio-3-input').check();
        cy.get('#mat-radio-5-input').check();
        howManyTimePlay.forEach(item => {
            cy.get('#playGame').click();
            cy.wait('@loadStarship');
            cy.get('app-starship-card').should('have.length', 2);
            let firstMass = null;
            let secondMass = null;
            cy.get(`[id="starshipCrew${firstPlayerName}"] > b`).invoke('text').then((first) => {
                firstMass = isNaN(Number(first)) ? 0 : Number(first);
                cy.get(`[id="starshipCrew${secondPlayerName}"] > b`).invoke('text').then((second) => {
                    secondMass = isNaN(Number(second)) ? 0 : Number(second);
                    let winnerName = null;
                    if (first === second) {
                        winnerName = null;
                        cy.get('#winnerDraw > b');
                    } else {
                        winnerName = firstMass > secondMass ? firstPlayerName : secondPlayerName;
                        cy.get('#winnerName > b').invoke('text').then(winner => {
                            expect(winner).to.equal(winnerName);
                        })
                    }
    
                });
            });
        })
    })
})

