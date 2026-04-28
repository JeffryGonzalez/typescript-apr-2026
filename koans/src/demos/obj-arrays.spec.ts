import { describe, expect, it } from "vitest";
import { getMovieSummary, Movie } from "./movie-utils";


// behavior driven style - Dan North created this.
describe("objects", () => {
    it('object literals', ()=> {

        const age = 13;



        const starWars:Movie = {
            title: 'Episode IV: A New Hope',
            director: 'Lucas',
            yearReleased: 1978,
            mpaaRating: 'PG'
        }

        starWars.yearReleased = 1977;
        expect(starWars.yearReleased).toBe(1977);
        expect(starWars['yearReleased']).toBe(1977); // indexer

       const empireStrikeBack = {
        title: 'Episode V: The Empire Strikes Back',
        director: 'Kershner',
        yearReleased: 1981,
        cast: [
            { role: 'Luke', actor: 'Mark Hamill'},
            { role: 'Leiah', actor: 'Carrie Fisher'}
        ]
       }

       const year = empireStrikeBack['yearReleased'];

       const s1 = getMovieSummary(starWars);

       //expect(s1).toBe('')
       // "Structural Typing" - Super rad, super dangerous.

       // Duck Typing - "If it walks like a duck.."
       const s2 = getMovieSummary(empireStrikeBack);

    });

    it('Arrays ', () => {
        type NumberOrString = number | string;
        let luckyNumbers:NumberOrString[];
        let bestFriends: Array<string | number>;

        luckyNumbers = [1,3, 'tacos', 3.14, 'pie']

        luckyNumbers[999] = 'bird';
        let el = luckyNumbers[999];

        // kind of a 'tuple' type - typed array.
        let config: [string, number, string[]];

        config = ['bird', 42, ['cat', 'hat']];

        const el2 = config[2][0];



    })
    it('array mutations', () => {
        const nums = [1,2,3,4,5];

        const reversed = nums.toReversed();
      
    })

})