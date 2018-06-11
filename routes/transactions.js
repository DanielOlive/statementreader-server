
import express from 'express'
import mongodb from 'mongodb'
import multer from 'multer'
import Transactions from '../models/transactions'
import csvLoader from '../services/csv-loader'

const router = express.Router();

router.get('/', (req, res) => {
    Transactions.find({}).sort({ date : -1 }).then(trans => {
        if(trans){
            res.json({ success: true, data:trans })  
        } else {
            res.status(400).json({errors:{ global: "No transactions available" }})
        }
    })
});

// Upload documents 
router.post('/', (req, res) => {
     const transactions = req.body
     const trans = new Transactions()
     console.log(trans)
     trans.collection.insert(transactions,{ upsert: true }, (err, docs) => {
        if (err) res.status(400).json({errors:{ global: "There was a problem uploading your file, please try again later." }});
        if (!err) {
            console.log("Multiple documents inserted to Collection");
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
                    if (err) res.status(400).json({errors:{ global: "Problem marking items as paid" }});
                    if (!err) {
                        res.json({ success: true })  
                    };
          }
     )
     // TODO: respond with complete doc
})


const upload = multer({dest: './uploads/'});

router.post('/upload', upload.single('file'), (req, res) => {

    const filepath = req.file.destination + req.file.filename;
    const provider = req.body.provider;
    csvLoader(filepath, provider);
    res.status(204).end();
});


export default router;