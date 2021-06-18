import {expect} from "chai";
import {util_validate} from "../../src/util";
import {IFormatRequest, IFormatRule} from "../../src/interface"

describe('test util validation class', async()=>{

    let request:IFormatRequest={};

    beforeEach(()=>{
        request = {input:undefined,formatRuleType:undefined,formatRule:undefined};
        request.input='';
    })

    it('when user does not send input, consider undefined by default', async()=>{

        const output = "input string is mandatory!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send input with blank space', async()=>{

        request.input=' '
        const output = "input string is mandatory!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send input with single quote', async()=>{

        request.input='';
        const output = "input string is mandatory!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send input with proper value', async()=>{

        request.input="testing";
        const output = "";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule without alignment', async()=>{

        request.input="testing";
        request.formatRule ={} as IFormatRule;
        const output = "alignment in formation rule is mandatory!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with wrong alignment', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"rigth"} as any;
        const output = "alignment value is wrong!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule without bold', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right"} as any;
        const output = "bold in formation rule should be array!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with wrong chuck_Norris type', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[]} as any;
        const output = "chuck_Norris in formation rule should be array!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with wrong italic type', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[], chuck_Norris:[]} as any;
        const output = "italic in formation rule should be array!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with wrong replace type', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[], chuck_Norris:[], italic:[]} as any;
        const output = "replace in formation rule should be array!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule without spacing', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[], chuck_Norris:[], italic:[],replace:[]} as any;
        const output = "spacing in formation rule is mandatory!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with wrong width type', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[], chuck_Norris:[], italic:[],replace:[],spacing:'\n'} as any;
        const output = "width in formation rule should be numeric!";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

    it('when user send formationRule with proper data', async()=>{

        request.input="testing";
        request.formatRule ={alignment:"right", bold:[], chuck_Norris:[], italic:[],replace:[],spacing:'\n',width:80} as any;
        const output = "";
        const result = await util_validate.format(request);

        expect(result).to.be.equal(output);
    })

})