import {expect} from "chai";
import {util_stringOperation} from "../../src/util";

describe('test util string operation class', async()=>{

    let width:number;
    let inputString:string
    const spacing = "\n";

    beforeEach(()=>{
        width=35;
        inputString = "If you are looking to have an impact on the world, then read carefully because at Choco";
    })

    it('a word found in input string', async()=>{

        const matchWord = "Choco"
        let result = await util_stringOperation.matchWord(inputString,matchWord);
        expect(result).to.be.true;
    })

    it('a word not found in input string', async()=>{

        const matchWord = "choco"
        const result = await util_stringOperation.matchWord(inputString,matchWord);
        expect(result).to.be.false;
    })

    it('replace a single word in input string', async()=>{

        const outputString = "If you are looking to have an impact on the world, then read carefully because at CHOCO"
        const wordToRepace = "Choco"
        const wordWithRepace = "CHOCO"

        const result = await util_stringOperation.replaceWord(inputString.split(" "),wordToRepace,wordWithRepace);

        expect(result.join(" ")).to.be.equal(outputString);
    })

    it('replace more then one word in input string', async()=>{

        inputString = "Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet";
        const outputString = "Our company has the potential to reduce _food_ prices, decrease _food_ waste by 30% and reshape one of the oldest and largest industries on the planet"
        const wordToRepace = "food"
        const wordWithRepace = "_food_"

        const result = await util_stringOperation.replaceWord(inputString.split(" "),wordToRepace,wordWithRepace);

        expect(result.join(" ")).to.be.equal(outputString);
    })

    it('input string with less than specified width', async()=>{

        inputString = "Our company has the potential";
        const outputString = "Our company has the potential";
        width=80;

        const result = await util_stringOperation.setWidth(inputString,width,spacing);

        expect(result).to.be.equal(outputString);
    })

    it('input string with more than specified width', async()=>{

        inputString = "Our company has the potential";
        const outputString = "Our \ncompany \nhas the \npotential";
        width=8;

        const result = await util_stringOperation.setWidth(inputString,width,spacing);

        expect(result).to.be.equal(outputString);
    })

    it('set alignment of input string with right aligment and specified width', async()=>{

        inputString = "Our company has the potential";
        const outputString = "     Our company has the potential";
        const alignment = "right"

        const result = await util_stringOperation.setAlignment(inputString,width,spacing,alignment);

        expect(result).to.be.equal(outputString);
    })

    it('set alignment of input string with right aligment and specified width', async()=>{

        inputString = "Our company has the potential";
        const outputString = "Our company has the potential     ";
        const alignment = "left"

        const result = await util_stringOperation.setAlignment(inputString,width,spacing,alignment);

        expect(result).to.be.equal(outputString);
    })

    it('set alignment of input string with center aligment and specified width', async()=>{

        inputString = "Our company has the potential";
        const outputString = "  Our company has the potential   ";
        const alignment = "center"

        const result = await util_stringOperation.setAlignment(inputString,width,spacing,alignment);

        expect(result).to.be.equal(outputString);
    })
})