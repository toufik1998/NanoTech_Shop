import { PRODUCTS_URl, UPLOAD_URl } from "../constants"; 
import { apiSlice } from "./apiSlice"; 

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URl,
                params: {
                    keyword,
                    pageNumber,
                },
            }),
            providesTags: ['Products'],
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
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URl}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URl,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URl}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URl}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URl}/top`,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery } = productsApiSlice;