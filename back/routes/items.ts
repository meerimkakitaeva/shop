import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import Item from "../models/Item";
import {IItem, IItemMutation} from "../types";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    try {
        const items: IItem[] = await Item.find();
        res.send(items);
    } catch (e) {
        return res.sendStatus(500);
    }
});

itemsRouter.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('user', 'displayName phone');

        if (!item) {
            return res.sendStatus(404);
        }

        return res.send(item);
    } catch {
        return res.sendStatus(500);
    }
});

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const userId = (req as RequestWithUser).user._id;

        const itemData: IItemMutation = {
            user: userId,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file ? req.file.filename : '',
            category: req.body.category,
        };

        const item = new Item(itemData);
        await item.save();

        return res.send(item);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next (e);
    }
});

export default itemsRouter;