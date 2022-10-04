import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (product == null) {
      return res.status(404).json({ msg: `product ${id} doesn't exist` });
    }

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.products.create({
      data: {
        name,
        price,
      },
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ msg: "bad request" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  try {
    await prisma.products.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
      },
    });
    return res.status(202).json({
      msg: `Product with id ${id} was updated`,
    });
  } catch (error) {
    res.status(404).json({ msg: `Product with id ${id} not found` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.products.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      status: 200,
      msg: `Product with id ${id} was deleted`,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      msg: `Product with id ${id} doesn't exist`,
    });
  }
};
