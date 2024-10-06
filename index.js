const express = require('express')
const app = express()
const mongoose = require("mongoose")



app.use(express.json())
app.listen(6000, () => {
    console.log("server çalışıyo")
})
const MONGO_URI = "mongodb+srv://fatihuzuntas37:hVtlQj2abbsnr2FK@cluster0.egus9.mongodb.net/OkulBTK";

mongoose
    .connect(MONGO_URI, {

    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const OgrenciSchema = new mongoose.Schema({
    ogrenciAd: String,
    ogrenciSoyad: String,
    ogrenciNo: Number
})

const Ogrenci = new mongoose.model("Ogrenci", OgrenciSchema)

app.post("/ogrenci-ekle", async(request, response, next) => {
    const yeni_ogrenci = await Ogrenci.create(request.body);
    response.send(yeni_ogrenci);
})
app.get("/ogrenci-getir", async(request, response, next) => {
    const ogrenciler = await Ogrenci.find();
    response.send(ogrenciler);
})
app.put("/ogrenci-guncelle", async(req, res, next) => {
    const body = req.body;
    const ogrenci = await Ogrenci.findByIdAndUpdate({})
})
app.delete("/ogrenci-sil", async(req, res, next) => {
    const ogrnumara = req.body.ogrenciNo
    const silinecek_ogrenci = await Ogrenci.del({ ogrenciNo: ogrnumara });
    res.send(silinecek_ogrenci);
})