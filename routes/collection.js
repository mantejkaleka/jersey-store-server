const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const collectionSchema = new mongoose.Schema({
    id: String,
    url: String,
    content: String,
    img: String,
    price: String
});

const collectionCatalogScheme = new mongoose.Schema({
    name: String,
    img: String,
    title: String,
    collectionItems: [collectionSchema]
})

const CollectionItem = mongoose.model('CollectionItem', collectionSchema);
const CollectionCatalog = mongoose.model('CollectionCatalog', collectionCatalogScheme);

router.get('/collectionItems', async(req, res) => {
    const collectionItem = await CollectionItem.find();
    res.send(collectionItem);
});

router.post('/collectionItems', async (req, res) => {;
    let collectionItem = new CollectionItem({
        url: req.body.url,
        content: req.body.content,
        img: req.body.img,
        price: req.body.price
    });
    collectionItem = await collectionItem.save();

    res.send(collectionItem);
});

router.post('/collectionCatalog', async(req, res) => {
    let catalog = new CollectionCatalog({
        name: req.body.name,
        img: req.body.imgUrl,
        title: req.body.title,
        collectionItems: req.body.collectionItems
    });
    collectionCatalog = await catalog.save();
    res.send(catalog);
});

router.get('/collectionCatalog', async(req, res) => {
    const collectionItem = await CollectionCatalog.find();
    res.send(collectionItem);
});

router.get('/collectionCatalog/:id', async(req, res) => {
    console.log('request', req.params);
    const catalogs = await CollectionCatalog.findById(req.params.id);
    if (!catalogs) return res.status(404).send('The catalog with the given id was not found.');
    res.send(catalogs);
});

module.exports = router;