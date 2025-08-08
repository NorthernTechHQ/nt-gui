// Copyright 2021 Northern.tech AS
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
//@ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Help as HelpIcon } from '@mui/icons-material';
import type { TooltipProps } from '@mui/material';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

import { READ_STATES, TIMEOUTS } from '@northern.tech/store/constants';
import { getDeviceById, getTooltipsState } from '@northern.tech/store/selectors';
import { setAllTooltipsReadState, setTooltipReadState } from '@northern.tech/store/thunks';
import type { Device } from '@northern.tech/types/MenderTypes';
import { useDebounce } from '@northern.tech/utils/debouncehook';
import { toggle, yes } from '@northern.tech/utils/helpers';
import type { PositioningStrategy } from '@popperjs/core';

import type { HelpTooltipComponent } from './HelpTooltips';
import { HELPTOOLTIPS } from './HelpTooltips';

const useStyles = makeStyles()(theme => ({
  icon: {
    '&.read': {
      color: theme.palette.text.disabled
    }
  },
  iconAura: {
    position: 'absolute',
    top: -5,
    bottom: 0,
    left: -5,
    right: -5,
    border: `1px dashed ${theme.palette.primary.main}`,
    borderRadius: '50%',
    '&.read': {
      borderColor: theme.palette.text.disabled
    }
  }
}));

export const MenderTooltip = withStyles(Tooltip, ({ palette, shadows, spacing }) => ({
  arrow: {
    color: palette.background.paper
  },
  tooltip: {
    backgroundColor: palette.background.paper,
    boxShadow: shadows[1],
    color: palette.text.primary,
    padding: spacing(2),
    fontSize: 'small',
    maxWidth: 600,
    info: {
      maxWidth: 300,
      color: palette.text.hint,
      backgroundColor: palette.grey[500]
    }
  }
}));

interface MenderTooltipClickableProps extends TooltipProps {
  onboarding?: boolean;
  onOpenChange?: (open: boolean) => void;
  startOpen?: boolean;
  tooltipComponent?: typeof MenderTooltip;
  visibility?: boolean;
}

export const MenderTooltipClickable = ({
  children,
  onboarding,
  startOpen = false,
  visibility = startOpen,
  onOpenChange,
  tooltipComponent = MenderTooltip,
  ...remainingProps
}): MenderTooltipClickableProps => {
  const [open, setOpen] = useState(startOpen || false);

  useEffect(() => {
    setOpen(visibility);
  }, [visibility]);

  useEffect(() => {
    if (!onOpenChange) {
      return;
    }
    onOpenChange(open);
  }, [open, onOpenChange]);

  const toggleVisibility = () => setOpen(toggle);

  const hide = () => setOpen(false);

  const Component = (onboarding ? OnboardingTooltip : tooltipComponent) as typeof Tooltip;
  const extraProps = onboarding
    ? {
        PopperProps: {
          disablePortal: true,
          popperOptions: {
            strategy: 'fixed' as PositioningStrategy,
            modifiers: [
              { name: 'flip', enabled: false },
              { name: 'preventOverflow', enabled: true, options: { boundary: window, altBoundary: false } }
            ]
          }
        }
      }
    : {};
  return (
    <ClickAwayListener onClickAway={hide}>
      <Component
        arrow={!onboarding}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        onOpen={() => setOpen(true)}
        {...extraProps}
        {...remainingProps}
      >
        <div onClick={toggleVisibility}>{children}</div>
      </Component>
    </ClickAwayListener>
  );
};

const iconWidth = 30;

export const OnboardingTooltip = withStyles(Tooltip, theme => ({
  arrow: {
    color: theme.palette.primary.main
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    color: theme.palette.grey[500],
    fontSize: 14,
    maxWidth: 350,
    padding: '12px 18px',
    width: 350,
    '& a': {
      color: theme.palette.grey[500]
    },
    '&.MuiTooltip-tooltipPlacementTop': { marginLeft: iconWidth, marginBottom: 0, marginTop: `calc(${iconWidth} + ${theme.spacing(1.5)})` },
    '&.MuiTooltip-tooltipPlacementRight': { marginTop: iconWidth / 2 },
    '&.MuiTooltip-tooltipPlacementBottom': { marginLeft: iconWidth },
    '&.MuiTooltip-tooltipPlacementLeft': { marginTop: iconWidth / 2 }
  },
  popper: {
    opacity: 0.9
  }
}));
export default MenderTooltip;

const tooltipStateStyleMap = {
  [READ_STATES.read]: 'read muted',
  default: ''
};

interface TooltipWrapperProps {
  content: ReactNode;
  onClose: () => void;
  onReadAll: () => void;
}

const TooltipWrapper = ({ content, onClose, onReadAll }: TooltipWrapperProps) => (
  <div>
    {content}
    <div className="flexbox space-between margin-top-small">
      <span className="link" onClick={onReadAll}>
        Mark all help tips as read
      </span>
      <span className="link" onClick={onClose}>
        Close
      </span>
    </div>
  </div>
);

export interface HelpTooltipProps {
  contentProps?: Record<string, unknown>;
  device?: Device; // TODO: use the UI Device type once it's available
  icon?: ReactNode;
  id: string;
  setAllTooltipsReadState: (state: keyof typeof READ_STATES) => void;
  setTooltipReadState: (args: { id: string; persist: boolean; readState: string }) => void;
  tooltip: Omit<HelpTooltipComponent, 'id' | 'isRelevant' | 'readState'> & {
    isRelevant: (props: { device?: Device }) => boolean;
    readState: keyof typeof READ_STATES;
  };
}

export const HelpTooltip = ({
  icon = undefined,
  id,
  contentProps = {},
  tooltip,
  device,
  setAllTooltipsReadState,
  setTooltipReadState,
  ...props
}: HelpTooltipProps & Omit<MenderTooltipClickableProps, 'children' | 'title'>) => {
  const [isOpen, setIsOpen] = useState(false);
  const debouncedIsOpen = useDebounce(isOpen, TIMEOUTS.threeSeconds);
  const { classes } = useStyles();
  const { Component, SpecialComponent, isRelevant, readState } = tooltip;

  useEffect(() => {
    if (!debouncedIsOpen) {
      return;
    }
    setTooltipReadState({ id, persist: true, readState: READ_STATES.read });
  }, [debouncedIsOpen, id, setTooltipReadState]);

  const onReadAllClick = () => setAllTooltipsReadState({ readState: READ_STATES.read, tooltipIds: Object.keys(HELPTOOLTIPS) });

  const title = SpecialComponent ? (
    <SpecialComponent device={device} {...contentProps} />
  ) : (
    <TooltipWrapper content={<Component device={device} {...contentProps} />} onClose={() => setIsOpen(false)} onReadAll={onReadAllClick} />
  );

  if (!isRelevant({ device, ...contentProps })) {
    return null;
  }

  const className = tooltipStateStyleMap[readState] ?? tooltipStateStyleMap.default;
  return (
    <MenderTooltipClickable className={isOpen ? 'muted' : ''} title={title} visibility={isOpen} onOpenChange={setIsOpen} {...props}>
      <div className="relative">
        {icon || <HelpIcon className={`${classes.icon} ${className}`} color="primary" />}
        <div className={`${classes.iconAura} ${className}`} />
      </div>
    </MenderTooltipClickable>
  );
};

type MenderHelpTooltipProps = {
  contentProps?: Record<string, unknown>;
  id: string;
} & Omit<HelpTooltipProps, 'setAllTooltipsReadState' | 'setTooltipReadState' | 'tooltip'>;

export const MenderHelpTooltip = (props: MenderHelpTooltipProps) => {
  const { id, contentProps = {} } = props;
  const tooltipsById = useSelector(getTooltipsState);
  const dispatch = useDispatch();
  const device = useSelector(state => getDeviceById(state, contentProps.deviceId));
  const { readState = READ_STATES.unread } = tooltipsById[id] || {};
  const { Component, SpecialComponent, isRelevant = yes } = HELPTOOLTIPS[id];

  const onSetTooltipReadState = useCallback((...args) => dispatch(setTooltipReadState(...args)), [dispatch]);
  const onSetAllTooltipsReadState = state => dispatch(setAllTooltipsReadState(state));

  return (
    <HelpTooltip
      setAllTooltipsReadState={onSetAllTooltipsReadState}
      setTooltipReadState={onSetTooltipReadState}
      device={device}
      tooltip={{ Component, SpecialComponent, isRelevant, readState }}
      {...props}
    />
  );
};
