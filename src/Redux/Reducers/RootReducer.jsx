
import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import ProductReducer from "./ProductReducer";
import BrandReducer from "./BrandReducer";
import TestimonialReducer from "./TestimonialReducer";

import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import NewsletterReducer from "./NewsletterReducer";
import ChackoutReducer from "./ChackoutReducer";
import ContactUsReducer from "./ContactUsReducer";

export default combineReducers({
     MaincategoryStateData: MaincategoryReducer,
     SubcategoryStateData: SubcategoryReducer,
     ProductStateData: ProductReducer,
     BrandStateData: BrandReducer,
     TestimonialStateData: TestimonialReducer,
     CartStateData:CartReducer,
     WishlistStateData:WishlistReducer,
     NewsletterStateData:NewsletterReducer,
     ChackoutStateData:ChackoutReducer,
     ContactUsStateData:ContactUsReducer,

})