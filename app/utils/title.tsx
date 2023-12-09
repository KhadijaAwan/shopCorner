import { FaMale, FaFemale } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { GiHeartNecklace, GiMonclerJacket } from "react-icons/gi";
import { PiSneakerFill } from "react-icons/pi";

export const titleTransform = (data: string) => {
  if (data.length < 25) {
    return data;
  } else return data.substring(0, 25) + "...";
};

export const cartTitles = [
  {
    id: "Product",
    column: 2,
  },
  {
    id: "Price",
    column: 1,
  },
  {
    id: "Quantity",
    column: 1.5,
  },
  {
    id: "Total",
    column: 1,
  },
  {
    id: "Delete",
    column: 0.5,
  },
];

export const orderTitles = [
  {
    id: "Product",
    column: 2,
  },
  {
    id: "Price",
    column: 1,
  },
  {
    id: "Quantity",
    column: 1.5,
  },
  {
    id: "Total",
    column: 1,
  },
];

export const productCategories = [
  {
    id: "Men",
    icon: FaMale,
  },
  {
    id: "Women",
    icon: FaFemale,
  },
  {
    id: "Kids",
    icon: FaChildren,
  },
  {
    id: "Jewellery",
    icon: GiHeartNecklace,
  },
  {
    id: "Jackets",
    icon: GiMonclerJacket,
  },
  {
    id: "Sneakers",
    icon: PiSneakerFill,
  },
];

export const inputFields = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Enter Your Name",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter Your Email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Your Password",
  },
];

export const inputLoginFields = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter Your Email",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Your Password",
  },
];

export const addProductFields = [
  {
    id: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter Product Name",
  },
  {
    id: "brand",
    type: "text",
    label: "Brand",
    placeholder: "Enter Product Brand",
  },
  {
    id: "price",
    type: "number",
    label: "Price",
    placeholder: "Enter Product Price",
  },
  {
    id: "rating",
    type: "number",
    label: "Rating",
    placeholder: "Enter Product Rating",
  },
  {
    id: "description",
    type: "paragraph",
    label: "Description",
    placeholder: "Enter Product Description",
  },
];

export const productColors = [
  {
    colorName: "Blue",
    colorCode: "#0000FF",
    choosenImg: null,
  },
  {
    colorName: "Green",
    colorCode: "#00FF00",
    choosenImg: null,
  },
  {
    colorName: "Yellow",
    colorCode: "#FFFF00",
    choosenImg: null,
  },
  {
    colorName: "Orange",
    colorCode: "#FF8000",
    choosenImg: null,
  },
  {
    colorName: "Red",
    colorCode: "#FF0000",
    choosenImg: null,
  },
  {
    colorName: "Pink",
    colorCode: "#FFC0CB",
    choosenImg: null,
  },
  {
    colorName: "Purple",
    colorCode: "#800080",
    choosenImg: null,
  },
  {
    colorName: "Gray",
    colorCode: "#808080",
    choosenImg: null,
  },
  {
    colorName: "Black",
    colorCode: "#000000",
    choosenImg: null,
  },
  {
    colorName: "Maroon",
    colorCode: "#800000",
    choosenImg: null,
  },
  {
    colorName: "White",
    colorCode: "#FFFFFF",
    choosenImg: null,
  },
  {
    colorName: "Brown",
    colorCode: "#964B00",
    choosenImg: null,
  },
  {
    colorName: "Golden",
    colorCode: "#FFD700",
    choosenImg: null,
  },
  {
    colorName: "Silver",
    colorCode: "#c0c0c0",
    choosenImg: null,
  },
];
