import TabNames from '../../../const/tab-names';

type TabsProps = {
  currentTab: TabNames,
  onChangeTab: (tab: TabNames) => void
}

function Tabs(props: TabsProps) {
  function switchTab(tab: TabNames, evt: React.MouseEvent) {
    evt.preventDefault();
    props.onChangeTab(tab);
  }

  function setActiveClass(t: TabNames) {
    if (props.currentTab === t) {
      return 'film-nav__item film-nav__item--active';
    }
    return 'film-nav__item';
  }

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className={setActiveClass(TabNames.Overview)}>
          <a href="#" className="film-nav__link" onClick={
            (evt) => switchTab(TabNames.Overview, evt)
          }
          >
            Overview
          </a>
        </li>
        <li className={setActiveClass(TabNames.Details)}>
          <a href="#" className="film-nav__link" onClick={
            (evt) => switchTab(TabNames.Details, evt)
          }
          >
            Details
          </a>
        </li>
        <li className={setActiveClass(TabNames.Reviews)}>
          <a href="#" className="film-nav__link" onClick={
            (evt) => switchTab(TabNames.Reviews, evt)
          }
          >
            Reviews
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;
