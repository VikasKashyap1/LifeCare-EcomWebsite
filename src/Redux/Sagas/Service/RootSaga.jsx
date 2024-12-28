import { all } from "redux-saga/effects";
import maincategorySagas from "../MaincategorySagas";
import subcategorySagas from "../SubcategorySagas ";
import productSagas from "../ProductSagas";
import brandSagas from "../BrandSagas";
import testimonialSagas from "../TestimonialSagas";


import cartSagas from "../CartSagas";
import newsletterSagas from "../NewsletterSagas";
import wishlistSagas from "../WishlistSagas";
import chackoutSagas from "../ChackoutSagas ";
import contactUsSagas from "../ContactUsSagas";

export default function* RootSaga() {
     yield all([
          maincategorySagas(),
          subcategorySagas(),
          productSagas(),
          brandSagas(),
          testimonialSagas(),
          cartSagas(),
          chackoutSagas(),
          newsletterSagas(),
          wishlistSagas(),
          contactUsSagas(),

     ])

}
