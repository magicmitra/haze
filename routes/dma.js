const express = require('express');
const polygons = require('../data/dma-polygons.json');
const inside = require('point-in-polygon');

const router = express.Router();

// POST -> input requires 'lat' and 'lng' retrieves DMA from polygon
router.post( '/findDMA', (req, res) => {
    // check for missing lat and lng
    if( !req.body.lat || !req.body.lng ) {
        return res.status(400).json({ msg: "lat and lng is required" });
    }
    
    // initialize DMA code to null, if no corresponding code is found, it stays null
    let dmaCode = null;
    const polygonsArray = polygons.features;
    /**
     * been using Java everyday for close to a year now, the traditional for loop was just 
     * really easy for me to write
     * now lets iterate over the array
     */
    for( let i = 0; i < polygonsArray.length; ++i ) {
        // assign DMA code if it has been found
        if ( inside( [req.body.lat, req.body.lng], polygonsArray[i].geometry.coordinates[0][0]) ) {
            dmaCode = polygonsArray[i].properties.dma_code;
            break;
        }
    }

    res.status(201).json({msg: `DMA code: ${dmaCode}`});
});

module.exports = router;