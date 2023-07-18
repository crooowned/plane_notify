import { ZSTDDecoder } from './zstddec/dist/zstddec.js';
import fetch from 'node-fetch';
const decoder = new ZSTDDecoder();
import wqi from './decoder.js';
import notifier from 'node-notifier';

setInterval(()=>poll(), 2000);
function poll(){
    decoder.init().then(()=>{
        fetch("https://globe.adsbexchange.com/re-api/?binCraft&zstd&box=51.863241,52.053001,7.698584,7.997273", {
            "headers": {
                "x-requested-with": "XMLHttpRequest",
                "cookie": "",
                "Referer": "https://globe.adsbexchange.com/",
            },
            "body": null,
            "method": "GET"
        }).then((response)=>{
            response.arrayBuffer().then((arraybuff)=>{
                let arr = new Uint8Array(arraybuff);
                let decoded = decoder.decode(arr, 0);
                let data = {buffer:decoded.buffer};
                wqi(data);
                data.aircraft.forEach((plane)=>{
                    if(plane.military || plane.interesting){
                        console.log(plane);
                        notifier.notify({
                            title: "Flightreg: " + plane.flight,
                            message: "Airplane over your airspace!",
                            sound: true
                        });
                    }
                });
            });
        }).catch((err)=>{
            console.log("Request failed",err);
        });
    })    
}
