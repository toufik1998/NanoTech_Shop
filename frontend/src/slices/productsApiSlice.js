import { PRODUCTS_URl } from "../constants"; 
import { apiSlice } from "./apiSlice"; 

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URl,
            }),
            keepUnusedDataFor: 5,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URl}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URl,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice;