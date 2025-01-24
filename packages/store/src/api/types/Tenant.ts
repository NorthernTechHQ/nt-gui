/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { UpgradeCompleteRequest } from "./UpgradeCompleteRequest";

/**
 * The tenant descriptor.
 */
export type Tenant = {
  parent_tenant_id: string;
  additional_info: {
    marketing: boolean;
    campaign: string;
  };
  plan: UpgradeCompleteRequest.plan;
  trial: boolean;
  trial_expiration: string | null;
  service_provider: boolean;
  cancelled_at: string | null;
  children_tenants: any[] | null;
  max_child_tenants: number;
  device_count: number;
  device_limit: number;
  binary_delta: boolean;
};
