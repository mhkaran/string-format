import {expect} from "chai";
import {service_chuckNorris} from "../../src/service";
import nock from "nock";
import {IConfig} from "../../src/interface";
const config:IConfig = require("../../src/constant/config.json");

describe('test service chuck norris class', async()=>{

    it('when we get success response', async()=>{

        nock(`${config.chuck_norris_url}`)
            .get(`?category=${config.chuck_norris_category_food}`)
            .reply(200, { value: 'Chuck Norris ordered a Big Mac at Burger King, and got one.' })

        const output = "Chuck Norris ordered a Big Mac at Burger King, and got one.";

        const result = await service_chuckNorris.getFact();
        expect(result).to.be.equal(output);

    });

    it('when we get failed response', async()=>{

        nock(`${config.chuck_norris_url}`)
            .get(`?category=${config.chuck_norris_category_food}`)
            .reply(500)

        const output = "";

        const result = await service_chuckNorris.getFact();
        expect(result).to.be.equal(output);

    });
})