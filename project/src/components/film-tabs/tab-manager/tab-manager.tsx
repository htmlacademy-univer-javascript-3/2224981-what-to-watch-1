import Tabs from '../tab-header/tab-header';
import OverviewTab from '../overview-tab/overview-tab';
import {useState} from 'react';
import TabNames from '../../../const/tab-names';
import DetailsTab from '../details-tab/details-tab';
import ReviewsTab from '../reviews-tab/reviews-tab';
import FilmInfo from '../../../types/film-info';

type TabManagerProps = {
  film: FilmInfo;
}

function TabManager({film}: TabManagerProps) {
  const [tab, setTab] = useState(TabNames.Overview);

  const tabMap = {
    [TabNames.Overview]: <OverviewTab film={film}/>,
    [TabNames.Details]: <DetailsTab film={film}/>,
    [TabNames.Reviews]: <ReviewsTab/>
  };

  return (
    <div className="film-card__desc">
      <Tabs currentTab={tab} onChangeTab={setTab}/>

      {tabMap[tab]}
    </div>
  );
}

export default TabManager;
