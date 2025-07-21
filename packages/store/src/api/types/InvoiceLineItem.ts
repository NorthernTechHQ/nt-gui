/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InvoiceLineItem = {
  /**
   * A human readable description of the item.
   */
  description: string;
  /**
   * The number of units for the given line item.
   */
  quantity: number;
  /**
   * The amount in the minimum transactable unit for the given currency (cents for USD).
   */
  amount: number;
  /**
   * The currency of amount.
   */
  currency: string;
  /**
   * The unique Stripe price ID for this item.
   */
  price_id?: string;
};
