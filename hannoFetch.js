"use strict";
/**
 * Hanno Fetch
 * Fetch ore data from ESI and write it to a local json file.
 */

const fs = require('fs');

// reusable blueprint object that can make many of
class Ore {
    // static to the Ore class, not to the instance
    static fetchURL = "https://esi.evetech.net/dev/markets/10000002/history/?datasource=tranquility&type_id=";

    constructor(name, typeID, ratio) {
        // this code block and members are created when used with the "new" keyword
        this.name = name;
        this.typeID = typeID;
        this.ratio = ratio;
        this.data = {};
    }

    updateOre = () => {
        console.log(`${this.name}: pulling data.`);
        return fetch(Ore.fetchURL + this.typeID).then(r => r.json()) // use of Ore static member
            .then(oreData => {
                this.data = oreData[oreData.length - 1];//grabs most recent market average.
                
                console.log(`${this.name}: ${this.data} data updates.`);

                return this;
            }).catch(error => {
                console.error(this.name, error);
        });
    }

    getData = () => this;
}
class HannoFetch {

    constructor() {
        // name, typeID, list of ratios
        this.staticOreData = [
            new Ore("Veldspar", 1230, [4, 0, 0, 0, 0, 0, 0, 0]),
            new Ore("Scordite", 1228, [1.5, 0.9, 0, 0, 0, 0, 0, 0]),
            new Ore("Pyroxeres", 1224, [0, 0.9, 0.3, 0, 0, 0, 0, 0]),
            new Ore("Plagioclase", 18, [1.75, 0, 0.7, 0, 0, 0, 0, 0]),
            new Ore("Omber", 1227, [0, 0.9, 0, 0.75, 0, 0, 0, 0]),
            new Ore("Kernite", 20, [0, 0, 0.6, 1.2, 0, 0, 0, 0]),
            new Ore("Jaspet", 1226, [0, 0, 1.5, 0, 0.5, 0, 0, 0]),
            new Ore("Hemorphite", 1231, [0, 0, 0, 2.4, 0.9, 0, 0, 0]),
            new Ore("Hedbergite", 21, [0, 4.5, 0, 0, 1.2, 0, 0, 0]),
            new Ore("Gneiss", 1229, [0, 20, 15, 8, 0, 0, 0, 0]),
            new Ore("Dark Ochre", 1232, [0, 0, 13.6, 12, 3.2, 0, 0, 0]),
            new Ore("Crokite", 1225, [0, 8, 20, 0, 8, 0, 0, 0]),
            new Ore("Spodumain", 19, [480, 0, 0, 10, 1.6, 0.8, 0.4, 0]),
            new Ore("Bistot", 1223, [0, 32, 12, 0, 0, 1.6, 0, 0]),
            new Ore("Arkonor", 22, [0, 32, 12, 0, 0, 0, 1.2, 0]),
            new Ore("Mercoxit", 11396, [0, 0, 0, 0, 0, 0, 0, 1.4]),
            new Ore("Bezdnacine", 52316, [200, 0, 0, 24, 0, 0, 0.32, 0]),
            new Ore("Talassonite", 52306, [200, 0, 0, 0, 4.8, 0, 0.16, 0]),
            new Ore("Rakovene", 52315, [200, 0, 0, 16, 0, 1, 0, 0]),
        ];
    }

    fetchOreData = (path) => {
        const oreFetches = [];
        this.staticOreData.forEach(async ore => {
            oreFetches.push(ore.updateOre());
        });
        Promise.all(oreFetches)
            .then(() => {
                this.writeOreData(path);
            });
    }

    writeOreData = (path) => {
        const fsData = { table: [] }; // const internal members are mutable/assignable

        this.staticOreData.forEach(ore => {
            fsData.table.push(ore.getData());
        });

        fs.writeFileSync(path, JSON.stringify(fsData), 'utf-8', (error) => {
            if (error) throw error;
            console.log("Write to JSON completed! :D");
        });
    }
}

const main = () => {
    const hannoFetch = new HannoFetch();
    hannoFetch.fetchOreData('hanno.json');
    // hannoFetch.writeOreData();
}

// TODO: refactor this to be an app with modules
main();
