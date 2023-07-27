//Module for calculating the most affordable ore for a given mineral.
//Algorithm should also take into account secondary minerals that an ore reprocesses into.

const hannoParseModule = require('./hannoParse.js');

//JSON NOT SECURE!!!! Change asap.
const oreJson = require('./hanno.json');

const hannoPrice = () => {
    
    const fetchHannoData = () => {
        //FIX LATER...
        //const fs = require('fs');

        // fs.readFileSync('hanno.json', 'utf8', (err, data) => {

        //     if (err) {
        //         console.log("hanno.json has not loaded");
        //         throw err;
        //     }

        //     oreJson = JSON.parse(data);
            
        // });
        //console.log(oreJson);

        return priceCalc(oreJson["table"]);

    }

    const priceCalc = (oreData) => {

        console.log(oreData);

        
        let cheapPriceOrder = [
            0, //tri 0
            0, //pye 1
            0, //mex 2
            0, //iso 3
            0, //noc 4
            0, //zyd 5
            0, //meg 6
            0  //mor 7
        ];
        
        let debugArr = [];

        //The ratio array indices/indexes corresponds to cheapPriceOrder.
        // tri in index 0, morphite in index 7, and nocxium in index 4 etc...
        let currentBestPrice;
        let currentBestOre;

        for (let i = 0; i < cheapPriceOrder.length; i++) {

            //reset currentBestPrice after we iterate through a mineral.
            currentBestPrice = undefined;
            currentBestOre = undefined;
            // debugArr.push([]);
            for (let j = 0; j < oreData.length; j++) {

                let oreToMineral = oreData[j]["ratio"][i] / oreData[j]["average"];
                oreToMineral = oreToMineral.toFixed(7);


                //debugArr[i].push([oreToMineral, oreData[j]["name"], i]);

                if (oreToMineral > currentBestPrice || currentBestPrice === undefined) {
                    
                    currentBestPrice = oreToMineral;
                    currentBestOre = oreData[j];

                }

            }
            debugArr.push(currentBestOre);

        }

        
        hannoParseModule(debugArr);

    }

    fetchHannoData();

}

//hannoParseModule();
hannoPrice();