// Copyright 2017 Northern.tech AS
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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import pluralize from 'pluralize';
import Cookies from 'universal-cookie';

dayjs.extend(utc);

const isEncoded = (uri = '') => uri !== decodeURIComponent(uri);

export const fullyDecodeURI = (uri: string) => {
  while (isEncoded(uri)) {
    uri = decodeURIComponent(uri);
  }
  return uri;
};

export const isEmpty = obj => {
  for (const _ in obj) {
    return false;
  }
  return true;
};

export const yes = () => true;
export const canAccess = yes;

export const versionCompare = (v1, v2) => {
  const partsV1 = `${v1}`.split('.');
  const partsV2 = `${v2}`.split('.');
  for (let index = 0; index < partsV1.length; index++) {
    const numberV1 = partsV1[index];
    const numberV2 = partsV2[index];
    if (numberV1 > numberV2) {
      return 1;
    }
    if (numberV2 > numberV1) {
      return -1;
    }
  }
  return 0;
};

/*
 *
 * Deep compare
 *
 */
export function deepCompare(...args) {
  let i, l, leftChain, rightChain;

  // eslint-disable-next-line sonarjs/cognitive-complexity
  function compare2Objects(x, y) {
    let p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p) || typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p) || typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case 'object':
        case 'function':
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (args.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = args.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(args[0], args[i])) {
      return false;
    }
  }

  return true;
}

export const stringToBoolean = (content: boolean | number | string) => {
  if (!content) {
    return false;
  }
  const string = content + '';
  switch (string.trim().toLowerCase()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
};

export const toggle = (current: boolean) => !current;

export const formatTime = date => {
  if (date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)) {
    return date.toISOString().slice(0, -1);
  } else if (date) {
    return date.replace(' ', 'T').replace(/ /g, '').replace('UTC', '');
  }
};

export const customSort = (direction: boolean, field: string) => (a, b) => {
  if (typeof a[field] === 'string') {
    const result = a[field].localeCompare(b[field], navigator.language, { sensitivity: 'case' });
    return direction ? result * -1 : result;
  }
  if (a[field] > b[field]) return direction ? -1 : 1;
  if (a[field] < b[field]) return direction ? 1 : -1;
  return 0;
};

export const duplicateFilter = (item, index, array) => array.indexOf(item) == index;

export const attributeDuplicateFilter = (filterableArray, attributeName = 'key') =>
  filterableArray.filter(
    (item, index, array) => array.findIndex(filter => filter[attributeName] === item[attributeName] && filter.scope === item.scope) == index
  );

export const unionizeStrings = (someStrings: string[], someOtherStrings: string[]) => {
  const startingPoint = new Set(someStrings.filter(item => item.length));
  const uniqueStrings = someOtherStrings.length
    ? someOtherStrings.reduce((accu, item) => {
        if (item.trim().length) {
          accu.add(item.trim());
        }
        return accu;
      }, startingPoint)
    : startingPoint;
  return [...uniqueStrings];
};

export const getFormattedSize = (bytes: number) => {
  const suffixes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (!bytes) {
    return '0 Bytes';
  }
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
};

type DeviceAttribute = string | string[];

// should be inferred from ATTRIBUTE_SCOPES instead
interface DeviceAttributes {
  identity?: DeviceAttribute;
  inventory?: DeviceAttribute;
  monitor?: DeviceAttribute;
  system?: DeviceAttribute;
  tags?: DeviceAttribute;
}

interface DeviceWithAttributes {
  attributes: DeviceAttributes;
}

const collectAddressesFrom = devices =>
  devices.reduce((collector: string[], { attributes = {} }: DeviceWithAttributes) => {
    const ips = Object.entries(attributes).reduce((accu: string[], [name, value]) => {
      if (name.startsWith('ipv4')) {
        if (Array.isArray(value)) {
          const texts = value.map(text => text.slice(0, text.indexOf('/')));
          accu.push(...texts);
        } else {
          const text = value.slice(0, value.indexOf('/'));
          accu.push(text);
        }
      }
      return accu;
    }, []);
    collector.push(...ips);
    return collector;
  }, []);

export const getDemoDeviceAddress = (devices, onboardingApproach) => {
  const defaultVitualizedIp = '10.0.2.15';
  const addresses = collectAddressesFrom(devices);
  const address = addresses.reduce((accu, item) => {
    if (accu && item === defaultVitualizedIp) {
      return accu;
    }
    return item;
  }, null);
  if (!address || (onboardingApproach === 'virtual' && (navigator.appVersion.indexOf('Win') != -1 || navigator.appVersion.indexOf('Mac') != -1))) {
    return 'localhost';
  }
  return address;
};

export const detectOsIdentifier = () => {
  if (navigator.appVersion.indexOf('Win') != -1) return 'Windows';
  if (navigator.appVersion.indexOf('Mac') != -1) return 'MacOs';
  if (navigator.appVersion.indexOf('X11') != -1) return 'Unix';
  return 'Linux';
};

type TimeUnit = 'days' | 'minutes' | 'hours';

interface StandardizedPhase {
  batch_size: number;
  delay?: number;
  delayUnit?: TimeUnit;
  start_ts?: number;
}

// should use this from generated MenderTypes instead, likely from a separate types package
interface DeploymentPhase {
  batch_size?: number;
  device_count?: number;
  start_ts?: string;
}

type UiDeploymentPhase = DeploymentPhase & StandardizedPhase;

export const standardizePhases = (phases: UiDeploymentPhase[]) =>
  phases.map((phase, index) => {
    const standardizedPhase = { batch_size: phase.batch_size, start_ts: index } as StandardizedPhase;
    if (phase.delay) {
      standardizedPhase.delay = phase.delay;
      standardizedPhase.delayUnit = phase.delayUnit || 'hours';
    }
    if (index === 0) {
      // delete the start timestamp from a deployment pattern, to default to starting without delay
      delete standardizedPhase.start_ts;
    }
    return standardizedPhase;
  });

interface DebConfigurationProps {
  deviceType?: string;
  hasMonitor: boolean;
  ipAddress?: string;
  isDemoMode: boolean;
  isHosted: boolean;
  isOnboarding: boolean;
  isPreRelease: boolean;
  tenantToken?: string;
  token: string;
}

const getInstallScriptArgs = ({ isHosted, isPreRelease, hasMonitor }: Partial<DebConfigurationProps>) => {
  let installScriptArgs = '--demo';
  installScriptArgs = isPreRelease ? `${installScriptArgs} -c experimental` : installScriptArgs;
  installScriptArgs = isHosted && hasMonitor ? `${installScriptArgs} --commercial` : installScriptArgs;
  installScriptArgs = isHosted ? `${installScriptArgs} --jwt-token $JWT_TOKEN` : installScriptArgs;
  return installScriptArgs;
};

const getSetupArgs = ({ deviceType = 'generic-armv6', ipAddress, isDemoMode, tenantToken, isOnboarding }: Partial<DebConfigurationProps>) => {
  let menderSetupArgs = `--quiet --device-type "${deviceType}"`;
  menderSetupArgs = tenantToken ? `${menderSetupArgs} --tenant-token $TENANT_TOKEN` : menderSetupArgs;
  // in production we use polling intervals from the client examples: https://github.com/mendersoftware/mender/blob/master/examples/mender.conf.production
  menderSetupArgs = isDemoMode || isOnboarding ? `${menderSetupArgs} --demo` : `${menderSetupArgs} --retry-poll 300 --update-poll 1800 --inventory-poll 28800`;
  if (isDemoMode) {
    // Demo installation, either OS os Enterprise. Install demo cert and add IP to /etc/hosts
    menderSetupArgs = `${menderSetupArgs}${ipAddress ? ` --server-ip ${ipAddress}` : ''}`;
  } else {
    // Production installation, either OS, HM, or Enterprise
    menderSetupArgs = `${menderSetupArgs} --server-url https://${window.location.hostname} --server-cert=""`;
  }
  return menderSetupArgs;
};

const installComponents = '--force-mender-client4';

export const getDebConfigurationCode = (props: DebConfigurationProps) => {
  const { tenantToken, token, isPreRelease } = props;
  const envVars = tenantToken ? `JWT_TOKEN="${token}"\nTENANT_TOKEN="${tenantToken}"\n` : '';
  const installScriptArgs = getInstallScriptArgs(props);
  const scriptUrl = isPreRelease ? 'https://get.mender.io/staging' : 'https://get.mender.io';
  const menderSetupArgs = getSetupArgs(props);
  return `${envVars}wget -O- ${scriptUrl} | sudo bash -s -- ${installScriptArgs} ${installComponents} -- ${menderSetupArgs}`;
};

export const getSnackbarMessage = (skipped: number, done: number) => {
  pluralize.addIrregularRule('its', 'their');
  const skipText = skipped
    ? `${skipped} ${pluralize('devices', skipped)} ${pluralize('have', skipped)} more than one pending authset. Expand ${pluralize(
        'this',
        skipped
      )} ${pluralize('device', skipped)} to individually adjust ${pluralize('their', skipped)} authorization status. `
    : '';
  const doneText = done ? `${done} ${pluralize('device', done)} ${pluralize('was', done)} updated successfully. ` : '';
  return `${doneText}${skipText}`;
};

type SoftwareInformationEntry = [string, DeviceAttribute];

interface SoftwareInformation {
  nonSoftware: SoftwareInformationEntry[];
  software: SoftwareInformationEntry[];
}

export const extractSoftware = (attributes: DeviceAttributes = {}) => {
  const softwareKeys = Object.keys(attributes).reduce<string[]>((accu, item) => {
    if (item.endsWith('.version')) {
      accu.push(item.substring(0, item.lastIndexOf('.')));
    }
    return accu;
  }, []);
  return Object.entries(attributes).reduce<SoftwareInformation>(
    (accu, item) => {
      if (softwareKeys.some(key => item[0].startsWith(key))) {
        accu.software.push(item);
      } else {
        accu.nonSoftware.push(item);
      }
      return accu;
    },
    { software: [], nonSoftware: [] }
  );
};

interface SoftwareItem {
  key: string;
  name: string;
  nestingLevel: number;
  version: DeviceAttribute;
}

export const extractSoftwareItem = (artifactProvides: DeviceAttributes = {}) => {
  const { software } = extractSoftware(artifactProvides);
  return (
    software
      .reduce<SoftwareItem[]>((accu, item) => {
        const infoItems = item[0].split('.');
        if (infoItems[infoItems.length - 1] !== 'version') {
          return accu;
        }
        accu.push({
          key: infoItems[0],
          name: infoItems.slice(1, infoItems.length - 1).join('.'),
          version: item[1],
          nestingLevel: infoItems.length
        });
        return accu;
      }, [])
      // we assume the smaller the nesting level in the software name, the closer the software is to the rootfs/ the higher the chances we show the rootfs
      // sort based on this assumption & then only return the first item (can't use index access, since there might not be any software item at all)
      .sort((a, b) => a.nestingLevel - b.nestingLevel)
      .reduce<SoftwareItem | undefined>((accu, item) => accu ?? item, undefined) // we have to pass in undefined as the reducer will fail with a type error otherwise
  );
};

const cookies = new Cookies();

export const createDownload = (target: string, filename: string, token: string) => {
  const link = document.createElement('a');
  link.setAttribute('href', target);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  cookies.set('JWT', token, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 5
  });
  link.click();
  document.body.removeChild(link);
};

export const createFileDownload = (content: string, filename: string, token: string) =>
  createDownload('data:text/plain;charset=utf-8,' + encodeURIComponent(content), filename, token);

export const getISOStringBoundaries = (currentDate: Date) => {
  const date = [currentDate.getUTCFullYear(), `0${currentDate.getUTCMonth() + 1}`.slice(-2), `0${currentDate.getUTCDate()}`.slice(-2)].join('-');
  return { start: `${date}T00:00:00.000`, end: `${date}T23:59:59.999` };
};

// err format from the backend can unfortunately still not be relied on
export const extractErrorMessage = (err, fallback = '') =>
  err.response?.data?.error?.message || err.response?.data?.error || err.error || err.message || fallback;

// res is "usually" an axios response
export const preformatWithRequestID = (res, failMsg: string) => {
  // ellipsis line
  if (failMsg.length > 100) failMsg = `${failMsg.substring(0, 220)}...`;

  try {
    if (res?.data && Object.keys(res.data).includes('request_id')) {
      const shortRequestUUID = res.data['request_id'].substring(0, 8);
      return `${failMsg} [Request ID: ${shortRequestUUID}]`;
    }
  } catch (e) {
    console.log('failed to extract request id:', e);
  }
  return failMsg;
};

interface UnixDateRange {
  end: number | null;
  start: number | null;
}

type UnixDateRangeParam = string | Date | null;

/**
 * Converts dates into Unix timestamps representing the start and end of their respective days.
 * Start timestamp will be set to 00:00:00, end timestamp will be set to 23:59:59.
 * If either date is invalid or null, that value in the returned object will remain null.
 * Handles both date strings correctly, preserving the exact date.
 *
 * @param {string|Date|null} [startDate=null] - The start date of the range.
 * @param {string|Date|null} [endDate=null] - The end date of the range.
 * @returns {{ start: number|null, end: number|null }} An object containing the start and end times as UNIX timestamps, or null if invalid or not set.
 */
export const dateRangeToUnix = (startDate: UnixDateRangeParam = null, endDate: UnixDateRangeParam = null): UnixDateRange => {
  const unixRange: UnixDateRange = { start: null, end: null };
  const format = 'YYYY-MM-DD';

  if (startDate !== null) {
    const start = dayjs.utc(dayjs(startDate).format(format));
    if (start.isValid()) {
      unixRange.start = start.startOf('day').unix();
    }
  }

  if (endDate !== null) {
    const end = dayjs.utc(dayjs(endDate).format(format));
    if (end.isValid()) {
      unixRange.end = end.endOf('day').unix();
    }
  }

  return unixRange;
};

export const byteArrayToString = (body: Buffer) => String.fromCharCode(...body);

export const blobToString = (blob: Blob) =>
  new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsArrayBuffer(blob);
  });
