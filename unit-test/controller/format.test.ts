import {expect} from "chai";
import {controller_format} from "../../src/controller";
import {businessLogic_format} from "../../src/businessLogic";
import {IFormatRequest,IResponse} from "../../src/interface";
import {httpStatusCode} from "../../src/constant";
import sinon from "sinon";

describe('test controller format class', async()=>{

    let request:IFormatRequest={};


    beforeEach(()=>{
        sinon.restore();
    })

    after(()=>{

    })

    it('when user request failed', async()=>{
        const result:IResponse = await controller_format.markdown(request);
        const output:IResponse = {statusCode:httpStatusCode.BAD_REQUEST,data:"input string is mandatory!"}
        expect(result).to.deep.equal(output);
    });

    it('when user request passed', async()=>{
        request.input="choco"
        sinon.mock(businessLogic_format).expects("markdown").returns('choco');
        const result:IResponse = await controller_format.markdown(request);
        const output:IResponse = {statusCode:httpStatusCode.OK,data:"choco"}
        expect(result).to.deep.equal(output);
    });

    it('when there is an error in businee logic folder', async()=>{
        request.input="choco"
        sinon.mock(businessLogic_format).expects("markdown").throws();
        const result:IResponse = await controller_format.markdown(request);
        console.log(result)
        const statusCode = httpStatusCode.INTERNAL_SERVER_ERROR;
        expect(result.statusCode).to.be.equal(statusCode);
    });

})