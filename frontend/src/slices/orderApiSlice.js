import { apiSlice } from "./apiSlice";
import { ORDERS_URl, PAYPAL_URl } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URl,
            }),
            keepUnusedDataFor: 5,
        }),

        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URl,
                method: 'POST',
                body: {...order},
            }),
        }),

        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URl}/${orderId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URl}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),

        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URl,
            }),
            keepUnusedDataFor: 5, 
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URl}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),

        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URl}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation, useGetPaypalClientIdQuery, useGetMyOrdersQuery } = orderApiSlice;