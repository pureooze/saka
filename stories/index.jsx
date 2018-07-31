import browser from './mock.js';
import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import sinon from 'sinon';
import SearchBar from 'src/saka/Main/Components/SearchBar/index.jsx';
import StandardSearch from 'src/saka/Main/Containers/StandardSearch/index.jsx';
import GUIContainer from 'src/saka/Main/Components/GUIContainer/index.jsx';
import SuggestionList from 'src/saka/Main/Components/SuggestionList/index.jsx';
import PaginationBar from 'src/saka/Main/Components/PaginationBar/index.jsx';
import * as test from 'msg/client.js';
import * as Msg from 'msgx/client.js';

storiesOf('SearchBar', module)
  .add('tab search with no search string', () => {
    const settingsStore = {
      sakaSettings: {
        enableFuzzySearch: true
      }
    };

    browser.storage.sync.get.returns(settingsStore);
    browser.storage.local.get.returns({});

    return (
      <SearchBar
        placeholder="Placeholder"
        searchString=""
        onKeyDown={() => {}}
        onInput={() => {}}
        onBlur={() => {}}
        onButtonClick={() => {}}
        onSuggestionClick={() => {}}
        mode="tab"
      />
    );
  })
  .add('tab search with a search string', () => {
    const settingsStore = {
      sakaSettings: {
        enableFuzzySearch: true
      }
    };

    browser.storage.sync.get.returns(settingsStore);
    browser.storage.local.get.returns({});

    return (
      <SearchBar
        placeholder="Placeholder"
        searchString="Saka storybook test"
        onKeyDown={() => {}}
        onInput={() => {}}
        onBlur={() => {}}
        onButtonClick={() => {}}
        onSuggestionClick={() => {}}
        mode="tab"
      />
    );
  });

storiesOf('SuggestionList', module)
  .add('no suggestions', () => {
    const suggestions = [];

    return (
      <SuggestionList
        searchString=""
        suggestions={suggestions}
        selectedIndex={0}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={() => {}}
      />
    );
  })
  .add(
    'three suggestions with middle one selected (cannot load favicons in storybook)',
    () => {
      const suggestions = [
        {
          type: 'tab',
          title: 'example',
          url: 'http://example.com'
        },
        { type: 'tab', title: 'Saka Storybook', url: 'http://localhost:9001' },
        {
          type: 'tab',
          title: 'Saka Github',
          url: 'https://github.com/lusakasa/saka'
        }
      ];

      return (
        <SuggestionList
          searchString=""
          suggestions={suggestions}
          selectedIndex={1}
          firstVisibleIndex={0}
          maxSuggestions={5}
          onSuggestionClick={() => {}}
        />
      );
    }
  );

storiesOf('PaginationBar', module)
  .add('no suggestions', () => {
    const suggestions = [];

    return (
      <PaginationBar
        selectedIndex={0}
        suggestions={suggestions}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onClickPrevious={() => {}}
        onClickNext={() => {}}
      />
    );
  })
  .add('fewer suggestions than max page amount', () => {
    const suggestions = [{}, {}, {}];

    return (
      <PaginationBar
        selectedIndex={0}
        suggestions={suggestions}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onClickPrevious={() => {}}
        onClickNext={() => {}}
      />
    );
  })
  .add('more suggestions than max page amount', () => {
    const suggestions = [{}, {}, {}, {}, {}, {}, {}];

    return (
      <PaginationBar
        selectedIndex={0}
        suggestions={suggestions}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onClickPrevious={() => {}}
        onClickNext={() => {}}
      />
    );
  });

storiesOf('GUIContainer', module).add('no suggestions', () => {
  const settingsStore = {
    sakaSettings: {
      enableFuzzySearch: true
    }
  };

  browser.storage.sync.get.returns(settingsStore);
  browser.storage.local.get.returns({});

  const queryResults = [
    {
      type: 'tab',
      title: 'example',
      url: 'http://example.com'
    },
    { type: 'tab', title: 'Saka Storybook', url: 'http://localhost:9001' },
    {
      type: 'tab',
      title: 'Saka Github',
      url: 'https://github.com/lusakasa/saka'
    }
  ];

  browser.tabs.query.returns(queryResults);
  // browser.runtime.getBackgroundPage.returns(tabHistory);
  sinon.stub(test, 'default').resolves('Testing');

  return (
    <StandardSearch
      placeholder="Tabs"
      mode="tab"
      showEmptySearchSuggestions="true"
      searchHistory={[]}
      updateSearchHistory={() => []}
    />
  );
});

{
  /* <GUIContainer
      selectedIndex={0}
      suggestions={suggestions}
      firstVisibleIndex={0}
      maxSuggestions={5}
      onClickPrevious={() => {}}
      onClickNext={() => {}}
    >
      <SearchBar
        placeholder="Placeholder"
        searchString="Saka storybook test"
        onKeyDown={() => {}}
        onInput={() => {}}
        onBlur={() => {}}
        onButtonClick={() => {}}
        onSuggestionClick={() => {}}
        mode="tab"
      />
      <SuggestionList
        searchString=""
        suggestions={suggestions}
        selectedIndex={1}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onSuggestionClick={() => {}}
      />
      <PaginationBar
        selectedIndex={0}
        suggestions={suggestions}
        firstVisibleIndex={0}
        maxSuggestions={5}
        onClickPrevious={() => {}}
        onClickNext={() => {}}
      />
    </GUIContainer> */
}
