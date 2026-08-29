// Copyright 2024 Northern.tech AS
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
import ReactGA from 'react-ga4';

import type { Tenant, User } from '@northern.tech/types/MenderTypes';

const cookieConsentCSS = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css';
const cookieConsentJS = 'https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js';

interface TrackingState {
  initialized: boolean;
  organization: Tenant | null;
  trackingEnabled: boolean;
  user: User | null;
}

const state: TrackingState = {
  initialized: false,
  organization: null,
  trackingEnabled: true,
  user: null
};

export const cookieconsent = (): Promise<{ trackingConsentGiven: boolean }> =>
  new Promise(resolve => {
    const style = document.createElement('link');
    style.href = cookieConsentCSS;
    style.rel = 'stylesheet';
    style.async = true;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src = cookieConsentJS;
    script.async = false;
    script.addEventListener('load', () => {
      (window as any).cookieconsent.initialise({
        palette: {
          popup: { background: '#5d0f43', text: '#ffffff' },
          button: { background: '#73a4ad', text: '#ffffff' }
        },
        position: 'bottom-left',
        type: 'opt-out',
        content: {
          message: 'We use cookies to analyze our traffic so we can improve our website and give you a better experience.',
          link: 'View our cookie policy',
          href: 'https://northern.tech/legal/cookies'
        },
        autoOpen: true,
        revokable: false,
        law: { regionalLaw: false },
        onStatusChange: (status: string) => {
          resolve({ trackingConsentGiven: status === 'allow' });
        }
      });
    });
    document.body.appendChild(script);
  });

export const initialize = (trackingCode: string): boolean => {
  if (state.initialized && state.trackingEnabled) {
    return false;
  }
  ReactGA.initialize(trackingCode);
  state.initialized = true;
  return true;
};

export const trackEvent = (data: { action: string; category: string; label?: string; value?: number }) => {
  if (state.initialized && state.trackingEnabled) {
    ReactGA.event(data);
  }
};

export const trackException = (error: { description: string; fatal?: boolean }) => {
  if (state.initialized && state.trackingEnabled) {
    ReactGA.event('error', error);
  }
};

export const pageview = (page?: string) => {
  // currently a no-op stored for later use, matching original behavior
  if (page) {
    // page view tracking placeholder
  }
};

export const setGA = (value: Record<string, unknown>) => {
  if (state.initialized && state.trackingEnabled) {
    ReactGA.set(value);
  }
};

export const setOrganizationUser = (organization: Tenant, user: User) => {
  if (!state.initialized || !state.trackingEnabled) {
    return;
  }
  const { user: currentUser, organization: currentOrganization } = state;
  if (currentOrganization?.id === organization.id && currentUser?.id === user.id && currentOrganization.plan === organization.plan) {
    return;
  }
  state.organization = organization;
  state.user = user;
  ReactGA.set({ dimension1: organization.plan });
  ReactGA.set({ dimension2: organization.id });
  ReactGA.set({ dimension3: user.id });
  ReactGA.set({ userId: user.id });
};

export const setTrackingEnabled = (trackingEnabled: boolean) => {
  state.trackingEnabled = trackingEnabled;
};

const Tracking = {
  cookieconsent,
  event: trackEvent,
  exception: trackException,
  initialize,
  pageview,
  set: setGA,
  setOrganizationUser,
  setTrackingEnabled
};

export default Tracking;
