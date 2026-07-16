import { NextFunction, Request, Response } from "express";
import { getDB } from "../config/db";
import { ObjectId } from "mongodb";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = getDB();
    const productCollections = db.collection("products");
    const data = req.body;
    const result = await productCollections.insertOne(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

interface ProductQuery {
  title?: { $regex: string; $options: string };
  category?: string;
}

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = getDB();
    const productCollections = db.collection("products");
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const sortBy = req.query.sortBy as string | undefined;

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (Number(page) - 1) * Number(limit);

    const query: ProductQuery = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    let sort: Record<string, 1 | -1> = {};

    switch (sortBy) {
      case "priceAsc":
        sort = { price: 1 };
        break;

      case "priceDesc":
        sort = { price: -1 };
        break;

      default:
        sort = {};
    }

    const result = await productCollections
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const totalData = await productCollections.countDocuments(query);
    const totalPage = Math.ceil(totalData / Number(limit));

    res.json({ products: result, page: Number(page), totalPage });
  } catch (error) {
    next(error);
  }
};

export const getSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = getDB();
    const productCollections = db.collection("products");
    const id = req.params.id;
    const result = await productCollections.find({ sellerId: id }).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = getDB();
    const productCollections = db.collection("products");
    const productId = req.params.productId;

    if (!productId || Array.isArray(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID format" });
      return;
    }

    const result = await productCollections.findOne({
      _id: new ObjectId(productId),
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const db = getDB();
    const productCollections = db.collection("products");
    const { productId } = req.params;

    if (!productId || Array.isArray(productId)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    if (!ObjectId.isValid(productId)) {
      res.status(400).json({ message: "Invalid product ID format" });
      return;
    }

    const result = await productCollections.deleteOne({
      _id: new ObjectId(productId),
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};