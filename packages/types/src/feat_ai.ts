/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * AI feedback form.
 */
export type feat_ai = {
  /**
   * Was this feature useful?
   */
  useful: boolean;
  /**
   * The deployment ID where this feedback was triggered for context.
   */
  deployment_id: string;
  /**
   * The device ID where this feedback was triggered for context.
   */
  device_id: string;
};
