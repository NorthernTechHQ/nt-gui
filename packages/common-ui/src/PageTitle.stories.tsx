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
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageTitle, getPageTitle } from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  component: PageTitle,
  title: 'common-ui/PageTitle'
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

// the component only renders a <title>, which React hoists into the document head - so the story shows the resulting title as well
const renderWithPreview = ({ segments }: { segments: (string | undefined)[] }) => (
  <>
    <PageTitle segments={segments} />
    <p>
      document title: <code>{getPageTitle(segments)}</code>
    </p>
  </>
);

export const Primary: Story = {
  name: 'PageTitle',
  render: renderWithPreview,
  args: { segments: ['Accepted', 'Devices'] }
};

export const SingleSegment: Story = {
  name: 'Single Segment',
  render: renderWithPreview,
  args: { segments: ['Releases'] }
};

export const WithEmptySegments: Story = {
  name: 'With Empty Segments',
  render: renderWithPreview,
  args: { segments: [undefined, 'Deployments', ''] }
};
