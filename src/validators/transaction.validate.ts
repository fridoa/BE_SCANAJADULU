import * as Yup from "yup";

export const transactionCreateValidator = Yup.object().shape({
    date: Yup.date().required("Transaction date is required"),
    total_price: Yup.number().required("Transaction amount is required").min(0, "Amount must be at least 0"),
    money_receive: Yup.number().required("Money received is required").min(0, "Money received must be at least 0"),
    money_return: Yup.number().required("Money returned is required").min(0, "Money returned must be at least 0"),
});

export const transactionUpdateValidator = Yup.object().shape({});       