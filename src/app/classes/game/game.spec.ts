import { PersonModel } from "../../models/person.model";
import { Game } from "./game.class";
import { GameType } from "../../shared/enums/game-type.enum";
import { GamePlayer } from "../../shared/enums/game-player.enum";
import { Player } from "../player/player.class";
import { firstPerson, secondPerson } from "../../mocks/person";

describe('Game Class', () => {
    let gamePerson: Game<PersonModel>;
    const firstPlayerName = "Player 1";
    const secondPlayerName = "Player 2";
    const initGame = (gamePlayer: GamePlayer =  GamePlayer.SINGLE) => {
        const players = [new Player<PersonModel>("Player 1"), new Player<PersonModel>("Player 2")];
        gamePerson = new Game<PersonModel>(GameType.PERSON, gamePlayer, players, "mass");
        gamePerson.isStarted = true;
    }
    const setPlayersDetails = (firstMass: number | null = 5, secondMass: number | null = 6) => {
        let overrideFirstPerson =  JSON.parse(JSON.stringify(firstPerson));
        overrideFirstPerson.mass = firstMass;
        let overridesecondPerson = JSON.parse(JSON.stringify(secondPerson));
        overridesecondPerson.mass = secondMass;
        gamePerson.players[0].details = overrideFirstPerson;
        gamePerson.players[1].details = overridesecondPerson;
    }

    describe('Test winner name', () => { 
        it("should not set winner name: player's details not set", () => {
            initGame();
            gamePerson.setWinnerName()
            expect(gamePerson.winnerName).toEqual(null);
        });

        const testCasesForSingleGame = [
            {
                testDescription: "should set winner name Player 2: 100 > 10",
                firstMass: 10,
                secondMass: 100,
                winnerName: secondPlayerName
            },
            {
                testDescription: "should set winner name Player 1: 2 > 1",
                firstMass: 2,
                secondMass: 1,
                winnerName: firstPlayerName
            },
            {
                testDescription: "should not set winner name: it is draw",
                firstMass: 10,
                secondMass: 10,
                winnerName: null
            },
            {
                testDescription: "should not set winner name: it is draw, for null options",
                firstMass: null,
                secondMass: null,
                winnerName: null
            },
        ]
       
        testCasesForSingleGame.forEach(testCase => {
            it(`${testCase}`, () => {
                initGame();
                setPlayersDetails(testCase.firstMass, testCase.secondMass);
                gamePerson.setWinnerName()
                expect(gamePerson.winnerName).toEqual(testCase.winnerName);
            });
        })
          
        it("should not set winner game but winner round, after first round in DOUBLE PLAYER", () => {
            initGame(GamePlayer.DOUBLE);
            setPlayersDetails(2, 4);
            gamePerson.setWinnerName()
            expect(gamePerson.winnerName).toEqual(null);
            expect(gamePerson.winnerRoundName).toEqual(secondPlayerName);
        });

        it("should set winner game the same as winner round, after last round in DOUBLE PLAYER", () => {
            initGame(GamePlayer.DOUBLE);
            setPlayersDetails(2, 4);
            gamePerson.players[0].currentPoint = 0;
            gamePerson.players[1].currentPoint = 4;
            gamePerson.currentRound = 5
            gamePerson.setWinnerName()
            expect(gamePerson.winnerName).toEqual(secondPlayerName);
            expect(gamePerson.winnerRoundName).toEqual(secondPlayerName);
        });

        it("should set winner game different that winner round, after last round in DOUBLE PLAYER", () => {
            initGame(GamePlayer.DOUBLE);
            setPlayersDetails(20, 4);
            gamePerson.players[0].currentPoint = 0;
            gamePerson.players[1].currentPoint = 4;
            gamePerson.currentRound = 5
            gamePerson.setWinnerName()
            expect(gamePerson.winnerName).toEqual(secondPlayerName);
            expect(gamePerson.winnerRoundName).toEqual(firstPlayerName);
        });
        it("should not set winner game it is draw, after last round in DOUBLE PLAYER", () => {
            initGame(GamePlayer.DOUBLE);
            setPlayersDetails(4, 4);
            gamePerson.players[0].currentPoint = 2;
            gamePerson.players[1].currentPoint = 2;
            gamePerson.currentRound = 5
            gamePerson.setWinnerName()
            expect(gamePerson.winnerName).toEqual(null);
            expect(gamePerson.winnerRoundName).toEqual(null);
        });

    });

    const testCasesGameIsOver = [
        {
            testDescription: "should set game is over after one round in GAME SINGLE",
            gamePlayer: GamePlayer.SINGLE,
            currentRound: 1,
            gameIsFinish: true,
            gameIsStart: false,
        },
        {
            testDescription: "should set game is NOT over after first round in GAME DOUBLE",
            gamePlayer: GamePlayer.DOUBLE,
            currentRound: 1,
            gameIsFinish: false,
            gameIsStart: true,
        },
        {
            testDescription: "should set game is NOT over halfway point of the game in GAME DOUBLE",
            gamePlayer: GamePlayer.DOUBLE,
            currentRound: 3,
            gameIsFinish: false,
            gameIsStart: true,
        },
        {
            testDescription: "should set game is over after one last round in GAME DOUBLE",
            gamePlayer: GamePlayer.DOUBLE,
            currentRound: 5,
            gameIsFinish: true,
            gameIsStart: false,
        },
    ]
    testCasesGameIsOver.forEach(testCase => {
        it(`${testCase.testDescription}`, () => {
            initGame(testCase.gamePlayer);
            setPlayersDetails();
            gamePerson.currentRound = testCase.currentRound;
            gamePerson.setWinnerName()
            expect(gamePerson.isFinish).toEqual(testCase.gameIsFinish);
            expect(gamePerson.isStarted).toEqual(testCase.gameIsStart);
        });
    })

});