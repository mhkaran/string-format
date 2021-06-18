import {expect} from "chai";
import {service_chuckNorris} from "../../src/service";
// import {util_stringOperation} from "../../src/util";
import {businessLogic_format} from "../../src/businessLogic";
import {IFormatRequest} from "../../src/interface";
//import {httpStatusCode} from "../../src/constant";
import sinon from "sinon";

describe('test business logic format class', async()=>{

    let request:IFormatRequest={};


    beforeEach(()=>{
        sinon.restore();
    })

    it('user request for single word without any formation', async()=>{
        request.input="chocos"
        const result = await businessLogic_format.markdown(request);
        const output = "                                                                         chocos"
        expect(result).to.equal(output);
    });


    it('user request with less then 80 word and without any format rule specified', async()=>{
        request.input="If you are looking to have an impact on the world"
        const result = await businessLogic_format.markdown(request);
        const output = "                              If you are looking to have an impact on the world"
        expect(result).to.equal(output);
    });

    it('user request with more then 80 word but with no bold, italic, replace & chunk norris word found without any format rule specified', async()=>{
        request.input="If you are looking to have an impact on the world, then read carefully because at choco, we are moving mountains to transition the world into sustainable fooding systems."
        const result = await businessLogic_format.markdown(request);
        const output = " If you are looking to have an impact on the world, then read carefully because\n     at choco, we are moving mountains to transition the world into SUSTAINABLE\n                                                               fooding systems."
        expect(result).to.equal(output);
    });

    it('user request with more then 80 word and any format rule specified (so ti will pick up default one)', async()=>{
        sinon.mock(service_chuckNorris).expects("getFact").returns('When Chuck Norris is in the mood for seafood... he enjoys fresh caught Kracken!!!');
        request.input="If you are looking to have an impact on the world, then read carefully because at Choco, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet."
        const result = await businessLogic_format.markdown(request);
        const output = " If you are looking to have an impact on the world, then read carefully because\n at **Choco**, we are moving mountains to transition the world into SUSTAINABLE\n                                                                _food_ systems.\n      The _food_ industry is an industry with essential problems, especially in\n  food-supply-chain. We are now leveraging technology to bring change and start\n                      the necessary transformation the industry is craving for.\n When **Chuck** **Norris** is in the mood for seafood... he enjoys fresh caught\n                                                                     Kracken!!!\n     We are building the digital platform on which the global _food_ trade will\noperate. Our company has the potential to reduce _food_ prices, decrease _food_\nwaste by 30% and reshape one of the oldest and largest industries on the planet."
        expect(result).to.equal(output);
    });

    it('user request with more then 80 word with specified format rule type restaurants-1', async()=>{
        request.formatRuleType="restaurants-1";
        sinon.mock(service_chuckNorris).expects("getFact").returns('When Chuck Norris is in the mood for seafood... he enjoys fresh caught Kracken!!!');
        request.input="If you are looking to have an impact on the world, then read carefully because at Choco, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet."
        const result = await businessLogic_format.markdown(request);
        const output = "If you are looking to have an impact on the world, then read carefully because \nat **Choco**, we are moving mountains to transition the world into SUSTAINABLE \n_food_ systems.                                                                \nThe _food_ industry is an industry with essential problems, especially in      \nfood-supply-chain. We are now leveraging technology to bring change and start  \nthe necessary transformation the industry is craving for.                      \nWhen **Chuck** **Norris** is in the mood for seafood... he enjoys fresh caught \nKracken!!!                                                                     \nWe are building the digital platform on which the global _food_ trade will     \noperate. Our company has the potential to reduce _food_ prices, decrease _food_\nwaste by 30% and reshape one of the oldest and largest industries on the planet."
        expect(result).to.equal(output);
    });

    it('user request with more then 80 word with custome specified format rule', async()=>{
        request.formatRuleType=undefined
        request.formatRule={"width":80,
            "alignment":"left",
            "spacing":"\n",
            "bold":["Choco", "Chuck", "Norris"],
            "italic":["food"],
            "replace":["Choco,CHOCO","sustainable,SUSTAINABLE"],
            "chuck_Norris":["industry", "change"]};
        sinon.mock(service_chuckNorris).expects("getFact").returns('When Chuck Norris is in the mood for seafood... he enjoys fresh caught Kracken!!!');
        request.input="If you are looking to have an impact on the world, then read carefully because at Choco, we are moving mountains to transition the world into sustainable food systems.\nThe food industry is an industry with essential problems, especially in food-supply-chain. We are now leveraging technology to bring change and start the necessary transformation the industry is craving for.\nWe are building the digital platform on which the global food trade will operate. Our company has the potential to reduce food prices, decrease food waste by 30% and reshape one of the oldest and largest industries on the planet."
        const result = await businessLogic_format.markdown(request);
        const output = "If you are looking to have an impact on the world, then read carefully because \nat **Choco**, we are moving mountains to transition the world into SUSTAINABLE \n_food_ systems.                                                                \nThe _food_ industry is an industry with essential problems, especially in      \nfood-supply-chain. We are now leveraging technology to bring change and start  \nthe necessary transformation the industry is craving for.                      \nWhen **Chuck** **Norris** is in the mood for seafood... he enjoys fresh caught \nKracken!!!                                                                     \nWe are building the digital platform on which the global _food_ trade will     \noperate. Our company has the potential to reduce _food_ prices, decrease _food_\nwaste by 30% and reshape one of the oldest and largest industries on the planet."
        expect(result).to.equal(output);
    });

})