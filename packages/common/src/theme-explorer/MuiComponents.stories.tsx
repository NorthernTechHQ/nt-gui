// Copyright 2025 Northern.tech AS
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
import { useState } from 'react';

import { Add, Delete, Edit, ExpandMore, Favorite, Home, Info, Menu, Search, Settings, Star } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  AppBar,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Skeleton,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react-vite';

const MuiComponents = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [toggleValue, setToggleValue] = useState('option1');
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(30);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [ratingValue, setRatingValue] = useState(4);
  const [selectValue, setSelectValue] = useState('option1');

  return (
    <Stack spacing={4} sx={{ p: 3, maxWidth: '100%', overflow: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        MUI Components
      </Typography>

      {/* Typography */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Stack spacing={1}>
          <Typography variant="h1">H1 Heading</Typography>
          <Typography variant="h2">H2 Heading</Typography>
          <Typography variant="h3">H3 Heading</Typography>
          <Typography variant="h4">H4 Heading</Typography>
          <Typography variant="h5">H5 Heading</Typography>
          <Typography variant="h6">H6 Heading</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="body1">Body 1 text</Typography>
          <Typography variant="body2">Body 2 text</Typography>
          <Typography variant="caption">Caption text</Typography>
          <Typography variant="overline">OVERLINE TEXT</Typography>
        </Stack>
      </Paper>

      {/* Buttons */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Buttons
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained" size="small">
              Small
            </Button>
            <Button variant="contained" size="medium">
              Medium
            </Button>
            <Button variant="contained" size="large">
              Large
            </Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="contained" startIcon={<Add />}>
              With Icon
            </Button>
          </Stack>
          <ButtonGroup variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Stack>
      </Paper>

      {/* Form Controls */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Form Controls
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Standard TextField" variant="outlined" defaultValue="Default value" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="With Icon"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Option</InputLabel>
              <Select value={selectValue} onChange={e => setSelectValue(e.target.value)} label="Select Option">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth multiline rows={4} label="Multiline TextField" variant="outlined" />
          </Grid>
        </Grid>

        <Stack spacing={3} sx={{ mt: 3 }}>
          <FormGroup>
            <FormLabel component="legend">Checkboxes</FormLabel>
            <FormControlLabel control={<Checkbox checked={checkboxChecked} onChange={e => setCheckboxChecked(e.target.checked)} />} label="Checkbox Option" />
            <FormControlLabel control={<Checkbox />} label="Unchecked" />
            <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
          </FormGroup>

          <FormControl>
            <FormLabel>Radio Buttons</FormLabel>
            <RadioGroup value={radioValue} onChange={e => setRadioValue(e.target.value)}>
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
              <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
            </RadioGroup>
          </FormControl>

          <Stack spacing={2}>
            <Typography>Switch</Typography>
            <FormControlLabel control={<Switch checked={switchChecked} onChange={e => setSwitchChecked(e.target.checked)} />} label="Switch Option" />
          </Stack>

          <Stack spacing={2}>
            <Typography>Slider</Typography>
            <Slider
              value={sliderValue}
              onChange={(_, newValue) => setSliderValue(newValue as number)}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Stack>

          <Stack spacing={2}>
            <Typography>Rating</Typography>
            <Rating value={ratingValue} onChange={(_, newValue) => setRatingValue(newValue || 0)} />
          </Stack>
        </Stack>
      </Paper>

      {/* Data Display */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Data Display
        </Typography>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Avatar>A</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
            <Badge badgeContent={4} color="primary">
              <Avatar>C</Avatar>
            </Badge>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label="Default Chip" />
            <Chip label="Clickable" onClick={() => {}} />
            <Chip label="Deletable" onDelete={() => {}} />
            <Chip label="With Icon" icon={<Star />} />
            <Chip label="Secondary" color="secondary" />
          </Stack>

          <Divider />

          <List sx={{ bgcolor: 'background.paper', maxWidth: 360 }}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </List>

          <Table sx={{ maxWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Paper>

      {/* Navigation */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Navigation
        </Typography>
        <Stack spacing={3}>
          <Breadcrumbs>
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Category
            </Link>
            <Typography color="text.primary">Current Page</Typography>
          </Breadcrumbs>

          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
          </Tabs>

          <ToggleButtonGroup value={toggleValue} exclusive onChange={(_, newValue) => setToggleValue(newValue)}>
            <ToggleButton value="option1">Option 1</ToggleButton>
            <ToggleButton value="option2">Option 2</ToggleButton>
            <ToggleButton value="option3">Option 3</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Paper>

      {/* Feedback */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Feedback
        </Typography>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              This is a warning alert
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              This is an info alert
            </Alert>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert
            </Alert>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <CircularProgress />
            <CircularProgress color="secondary" />
            <CircularProgress variant="determinate" value={75} />
          </Stack>

          <LinearProgress />
          <LinearProgress variant="determinate" value={50} />

          <Stack spacing={1}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="circular" width={40} height={40} />
          </Stack>
        </Stack>
      </Paper>

      {/* Surfaces */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Surfaces
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title="Card Title" subheader="Card Subtitle" />
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography>Image Placeholder</Typography>
              </CardMedia>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This is the card content area where you can add any content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Action 1</Button>
                <Button size="small">Action 2</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Paper Component
              </Typography>
              <Typography variant="body2">This is a Paper component with elevation 3.</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Paper>

      {/* Interactive Components */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Interactive Components
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <IconButton color="primary">
            <Edit />
          </IconButton>
          <IconButton color="secondary">
            <Delete />
          </IconButton>
          <Tooltip title="Favorite">
            <IconButton>
              <Favorite />
            </IconButton>
          </Tooltip>
          <Fab color="primary" size="medium">
            <Add />
          </Fab>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Button variant="contained" onClick={() => setSnackbarOpen(true)}>
            Show Snackbar
          </Button>
        </Stack>
      </Paper>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <Typography>This is the dialog content. You can add any content here.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setDialogOpen(false)} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message="This is a snackbar message" />

      {/* App Bar */}
      <Paper sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App Bar Title
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </Stack>
  );
};

const meta: Meta<typeof MuiComponents> = {
  title: 'common/ThemeExplorer/AllComponents',
  component: MuiComponents,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof MuiComponents>;

export const AllComponents: Story = {
  render: () => <MuiComponents />
};
