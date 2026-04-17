// Copyright 2026 Northern.tech AS
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
import { load } from 'js-yaml';
import { OpenAPIBackend } from 'openapi-backend';
import type { Document } from 'openapi-backend';

import specYaml from '../openapi.yaml';

const spec = load(specYaml) as Document;

// Inject additionalProperties: false into all schema objects so that extra fields are caught during validation.
// Direct children of allOf are skipped because AJV validates each allOf sub-schema independently
// additionalProperties: false on one sub-schema would reject properties defined in a sibling sub-schema.
//TODO: explore the ways to address the issue above

const strictifySchemas = (obj: any, insideAllOf = false) => {
  if (!obj || typeof obj !== 'object') return;
  if (!insideAllOf && obj.properties && obj.additionalProperties === undefined) {
    obj.additionalProperties = false;
  }
  Object.entries(obj).forEach(([key, value]) => {
    if (key === 'allOf' && Array.isArray(value)) {
      value.forEach((item: any) => strictifySchemas(item, true));
    } else {
      strictifySchemas(value, false);
    }
  });
};
strictifySchemas(spec);

const customOpenAPIFormats = ['date-time', 'duration', 'email', 'uuid', 'uri-reference', 'long', 'base64', 'url'];

const api = new OpenAPIBackend({
  definition: spec,
  quick: false,
  strict: true,
  customizeAjv: ajv => {
    //TODO: maybe we can improve format across the spec
    customOpenAPIFormats.forEach(format => ajv.addFormat(format, true));
    return ajv;
  }
});
api.init();

export const validateRequest = async (request: Request) => {
  const url = new URL(request.url);
  const contentType = request.headers.get('content-type') || '';
  let body: unknown;
  if (['GET', 'HEAD'].includes(request.method)) {
    body = undefined;
  } else if (contentType.includes('multipart/form-data')) {
    const formData = await request.clone().formData();
    body = Object.fromEntries(formData.entries());
  } else {
    body = await request
      .clone()
      .json()
      .catch(() => undefined);
  }

  const { errors } = api.validateRequest({
    method: request.method,
    path: url.pathname,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(url.searchParams.entries()),
    body
  });

  if (errors) {
    const message = `Invalid request: ${request.method} ${url.pathname}\nErrors: ${JSON.stringify(errors, null, 2)}\nRequest body: ${JSON.stringify(body, null, 2)}`;
    console.error(message);
    throw new Error(message);
  }
};

// wrapper for msw handlers
export const validated = resolver => async info => {
  await validateRequest(info.request);
  return resolver(info);
};
