import * as Yup from "yup";

export const productCreateValidator = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Product price is required").min(0, "Price must be at least 0"),
    cost_price: Yup.number().required("Product cost price is required").min(0, "Cost price must be at least 0"),
    stock: Yup.number().required("Product stock is required").min(0, "Stock must be at least 0"),
    category: Yup.string().optional(),
    image_url: Yup.string().url("Image URL must be a valid URL").optional(),
    sku: Yup.string().required("SKU is required"),
});

export const productUpdateValidator = Yup.object().shape({
    name: Yup.string().optional(),
    price: Yup.number().min(0, "Price must be at least 0").optional(),
    cost_price: Yup.number().min(0, "Cost price must be at least 0").optional(),
    stock: Yup.number().min(0, "Stock must be at least 0").optional(),
    category: Yup.string().optional(),
    image_url: Yup.string().url("Image URL must be a valid URL").optional(),
    sku: Yup.string().optional(),
});

export type ProductCreateInput = Yup.InferType<typeof productCreateValidator>;
export type ProductUpdateInput = Yup.InferType<typeof productUpdateValidator>;