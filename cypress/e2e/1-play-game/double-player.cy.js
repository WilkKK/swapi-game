const firstPlayerName = "Player 1";
const secondPlayerName = "Player 2";
const howManyRounds = [1, 2, 3, 4, 5];
let winnerRound = null;

describe('play game for double player', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/')
    })

    // it('Play game with person card', async () => {
    //     cy.get('#mat-radio-2-input').check();
    //     cy.get('#mat-radio-6-input').check();

    //     howManyRounds.forEach((item, index) => {
    //         cy.intercept('GET', 'https://www.swapi.tech/api/people/*').as('loadPerson');
    //         if (index === 0) {
    //             cy.get('#playGame').click();
    //         } else {
    //             cy.get('#nextRound').click();
    //         }
    //         cy.wait('@loadPerson');
    //         cy.get('app-person-card').should('have.length', 2);

    //         cy.get(`[id="personMass${firstPlayerName}"] > b`).invoke('text').then((first) => {
    //             const firstMass = isNaN(Number(first)) ? 0 : Number(first);
    //             cy.get(`[id="personMass${secondPlayerName}"] > b`).invoke('text').then((second) => {
    //                 const secondMass = isNaN(Number(second)) ? 0 : Number(second);
    //                 if (firstMass !== secondMass) {
    //                     const winnerName = firstMass > secondMass ? firstPlayerName : secondPlayerName;
    //                     cy.get('#winnerName > b').invoke('text').then(winner => {
    //                         expect(winner).to.equal(winnerName);
    //                         winnerRound = winnerName;
    //                     });
    //                 } else {
    //                     winnerRound = null;
    //                     cy.get('#winnerDraw > b').should('exist');
    //                 }
    //             });
    //         });
    //         if (index === 4) {
    //             cy.get(`[id="points${firstPlayerName}"]`).invoke('text').then((first) => {
    //                 const firstPoints = first.split(': ')[1];
    //                 cy.get(`[id="points${secondPlayerName}"]`).invoke('text').then((second) => {
    //                     const secondPoints = second.split(': ')[1];
    //                     if (firstPoints === secondPoints) {
    //                         cy.get('#winnerDrawGame > b').should('exist');
    //                     } else {
    //                         const winnerAllGame = Number(firstPoints) > Number(secondPoints) ? firstPlayerName : secondPlayerName;
    //                         cy.get('#winnerNameGame > b').invoke('text').then(winner => {
    //                             expect(winner).to.equal(winnerAllGame);
    //                         });
    //                     }
    //                 })
    //             })
    //         }
    //     })

    // });

    it('Play game with starship card', async () => {
        cy.get('#mat-radio-3-input').check();
        cy.get('#mat-radio-6-input').check();

        howManyRounds.forEach((item, index) => {
            cy.intercept('GET', 'https://www.swapi.tech/api/starships/*').as('loadStarship');
            if (index === 0) {
                cy.get('#playGame').click();
            } else {
                cy.get('#nextRound').click();
            }
            cy.wait('@loadStarship');
            cy.get('app-starship-card').should('have.length', 2);

            cy.get(`[id="starshipCrew${firstPlayerName}"] > b`).invoke('text').then((first) => {
                const firstMass = isNaN(Number(first)) ? 0 : Number(first);
                cy.get(`[id="starshipCrew${secondPlayerName}"] > b`).invoke('text').then((second) => {
                    const secondMass = isNaN(Number(second)) ? 0 : Number(second);
                    if (firstMass !== secondMass) {
                        const winnerName = firstMass > secondMass ? firstPlayerName : secondPlayerName;
                        cy.get('#winnerName > b').invoke('text').then(winner => {
                            expect(winner).to.equal(winnerName);
                            winnerRound = winnerName;
                        });
                    } else {
                        winnerRound = null;
                        cy.get('#winnerDraw > b').should('exist');
                    }
                });
            });
            if (index === 4) {
                cy.get(`[id="points${firstPlayerName}"]`).invoke('text').then((first) => {
                    const firstPoints = first.split(': ')[1];
                    cy.get(`[id="points${secondPlayerName}"]`).invoke('text').then((second) => {
                        const secondPoints = second.split(': ')[1];
                        if (firstPoints === secondPoints) {
                            cy.get('#winnerDrawGame > b').should('exist');
                        } else {
                            const winnerAllGame = Number(firstPoints) > Number(secondPoints) ? firstPlayerName : secondPlayerName;
                            cy.get('#winnerNameGame > b').invoke('text').then(winner => {
                                expect(winner).to.equal(winnerAllGame);
                            });
                        }
                    })
                })
            }
        })

    });
})

