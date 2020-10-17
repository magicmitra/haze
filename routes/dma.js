const express = require('express');
const polygons = require('../data/dma-polygons.json');
const inside = require('point-in-polygon');

const router = express.Router();

router.post( '/findDMA', (req, res) => {
    // check for missing lat and lng
    if( !req.body.lat || !req.body.lng ) {
        return res.status(400).json({ msg: "lat and lng is required" });
    }
    
    let dmaCode = null;
    const polygonsArray = polygons.features;
    for( let i = 0; i < polygonsArray.length; ++i ) {
        if ( inside( [req.body.lat, req.body.lng], polygonsArray[i].geometry.coordinates[0][0]) ) {
            dmaCode = polygonsArray[i].properties.dma_code;
            break;
        }
    }

    res.status(201).json({msg: `DMA code: ${dmaCode}`});
});

module.exports = router;