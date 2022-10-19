import React, {useState} from 'react';
import {ALL_GENRES_KEY} from '../../const/simple-const';

type CategoryTabsProps = {
  tabs: string[],
  onChangeTab: (tab: string) => void
}

function CategoryTabs(props: CategoryTabsProps) {
  const [activeTab, setActiveTab] = useState(ALL_GENRES_KEY);

  const changeTab = (evt: React.MouseEvent, tab: string) => {
    evt.preventDefault();
    props.onChangeTab(tab);
    setActiveTab(tab);
  };

  const setActiveStyle = (tabName: string) => {
    if (activeTab === tabName) {
      return 'catalog__genres-item--active';
    }
    return '';
  };

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${setActiveStyle(ALL_GENRES_KEY)}`}>
        <a href="#" className="catalog__genres-link" onClick={
          (evt) => changeTab(evt, ALL_GENRES_KEY)
        }
        >
          All genres
        </a>
      </li>
      {
        props.tabs.map((item, idx) => (
          <li key={item} className={`catalog__genres-item ${setActiveStyle(item)}`}>
            <a href="#" className="catalog__genres-link" onClick={
              (evt) => changeTab(evt, item)
            }
            >
              {item}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default CategoryTabs;
