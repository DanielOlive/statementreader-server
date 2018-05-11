
import express from 'express'
import mongodb from 'mongodb'
import Transactions from '../models/transactions'
import csvLoader from '../services/csv-loader.js'
import { read } from 'fs';
import multer from 'multer'

const router = express.Router();

router.get('/', (req, res) => {
    Transactions.find({}).sort({ date : -1 }).then(trans => {
        if(trans){
            // console.log(res)
            res.json({ success: true, data:trans })  
        } else {
            res.status(400).json({errors:{ global: "No transactions available" }})
        }
    })
});

// Upload documents 
router.post('/', (req, res) => {
     const transactions = req.body
    //  console.log(req.body)
     const trans = new Transactions()
     trans.collection.insert(transactions,{ upsert: true }, (err, docs) => {
        if (err) console.error(err);
        if (!err) {
            console.log("Multiple documents inserted to Collection", docs);
            res.json({ success: true })
        }
      });
})

// Updates multiple documents by ID and set them to paid with date
router.post('/update', (req, res) => {
    const ids = req.body
     Transactions.update(
        { _id: { 
            $in: ids.map(item => new mongodb.ObjectID(item)) 
        } },
        { $set: { 
            paid : true, 
            paidDate: new Date() 
        } }, 
            {multi: true, 
                upsert: true
            }, 
                (err, docs) => {
                    if (err) console.error(err);
                    if (!err) {
                        console.log("UPDATED MULTI DOCS", docs)
                        res.json({ success: true })  
                    };
          }
     )
     // TODO: respond with complete doc
})


const upload = multer({dest: './uploads/'});
router.post('/upload', upload.single('file'), (req, res) => {
    const filepath = req.file.destination + req.file.filename;
    csvLoader(filepath);
    res.status(204).end();
});


export default router;