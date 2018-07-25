import browser from './mock.js';
import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import StandardSearch from 'src/saka/Main/index.jsx';

storiesOf('StandardSearch', module).add('with no entries', () => {
  const settingsStore = {
    sakaSettings: {
      enableFuzzySearch: true
    }
  };

  browser.storage.sync.get.returns(settingsStore);

  const suggestions = [];

  const searchString = {};
  return <StandardSearch />;
});
