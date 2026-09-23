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
import type { Components, Theme } from '@mui/material';
import { alpha, badgeClasses, buttonClasses, menuItemClasses } from '@mui/material';

export const components: Components<Theme> = {
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        '&:before': {
          display: 'none'
        },
        '&:hover': {
          borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.42)'
        },
        padding: theme.spacing(1, 2),
        alignItems: 'flex-start',
        alignSelf: 'stretch'
      })
    }
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        alignItems: 'flex-start',
        alignSelf: 'stretch'
      }
    }
  },
  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        [`& .${badgeClasses.colorInfo}`]: {
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey?.[100] : theme.palette.grey?.[700],
          color: theme.palette.text.primary
        }
      })
    }
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: 'none',
        boxShadow: 'none',
        [`&:hover:not(.${buttonClasses.colorInfo})`]: {
          boxShadow: 'none'
        },
        variants: [
          {
            props: { variant: 'outlined', color: 'info' },
            style: { color: theme.palette.neutral.contrastText }
          },
          {
            props: { variant: 'outlined', color: 'neutral' },
            style: { color: theme.palette.neutral.contrastText }
          },
          {
            props: { variant: 'contained', color: 'info' },
            style: { boxShadow: theme.shadows[2] }
          },
          {
            props: { variant: 'contained', color: 'neutral' },
            style: { boxShadow: theme.shadows[2] }
          }
        ]
      }),
      text: {
        textTransform: 'none'
      }
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        textTransform: 'none'
      }
    }
  },
  MuiButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${buttonClasses.contained}:not(.${buttonClasses.colorInfo})`]: {
          boxShadow: 'none'
        },
        [`& .${buttonClasses.colorInfo}.${buttonClasses.contained}`]: {
          boxShadow: theme.shadows[2] // Elevation/2 for neutral buttons
        }
      })
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        boxShadow: 'none'
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`.${buttonClasses.text}`]: {
          color: theme.palette.text.primary
        },
        [`.${buttonClasses.text}:hover`]: {
          backgroundColor: alpha(theme.palette.text.primary, 0.08)
        }
      })
    }
  },
  MuiDialogContent: {
    defaultProps: {
      dividers: true
    }
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        minWidth: 'min-content',
        maxWidth: '80vw',
        padding: theme.spacing(3, 8),
        borderRadius: 0
      })
    }
  },
  MuiFormControl: {
    defaultProps: {
      variant: 'outlined'
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        minWidth: 220
      }
    }
  },
  MuiInputLabel: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiMenu: {
    styleOverrides: {
      list: ({ theme }) => ({
        [`& .${menuItemClasses.root}.Mui-selected`]: {
          backgroundColor: theme.palette.primary.main + '12' // 12% opacity
        }
      })
    }
  },
  MuiMenuItem: {
    defaultProps: {
      dense: true
    }
  },
  MuiOutlinedInput: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiSelect: {
    defaultProps: {
      autoWidth: true,
      size: 'small',
      variant: 'outlined'
    },
    styleOverrides: {
      root: {
        minWidth: 220
      }
    }
  },
  MuiSwitch: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none'
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
      variant: 'outlined'
    },
    styleOverrides: {
      root: {
        minWidth: 220
      }
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        textTransform: 'none'
      }
    }
  },
  MuiSpeedDialAction: {
    styleOverrides: {
      fab: ({ theme }) => ({
        color: alpha(theme.palette.info.contrastText, 0.54)
      }),
      staticTooltipLabel: ({ theme }) => ({
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[6]
      })
    }
  }
};
