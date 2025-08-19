/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Filterable attribute
 */
export type FilterAttribute = {
  /**
   * Name of the attribute.
   */
  name: string;
  /**
   * Scope of the attribute.
   */
  scope: FilterAttribute.scope;
  /**
   * Number of occurrences of the attribute in the database.
   */
  count: number;
};
export namespace FilterAttribute {
  /**
   * Scope of the attribute.
   */
  export enum scope {
    SYSTEM = "system",
    IDENTITY = "identity",
    INVENTORY = "inventory",
    MONITOR = "monitor",
    TAGS = "tags",
  }
}
