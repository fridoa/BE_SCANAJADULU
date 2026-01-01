import * as Yup from "yup";

export const transactionCreateValidator = Yup.object().shape({
  transaction_date: Yup.date().required("Transaction date is required"),
  total_price: Yup.number().required("Transaction amount is required").min(0, "Amount must be at least 0"),
  money_receive: Yup.number().required("Money received is required").min(0, "Money received must be at least 0"),
  money_return: Yup.number().required("Money returned is required").min(0, "Money returned must be at least 0"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.string().required("Product ID is required"),
        name: Yup.string().required("Product name is required"),
        current_price: Yup.number().required("Price is required").min(0),
        quantity: Yup.number().required("Quantity is required").min(1),
        subtotal: Yup.number().required("Subtotal is required").min(0),
      })
    )
    .required("Items are required")
    .min(1, "At least one item is required"),
});

export const transactionUpdateValidator = Yup.object().shape({});
