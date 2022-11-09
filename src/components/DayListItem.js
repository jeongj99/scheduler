import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = spots => {
  if (spots === 0) {
    return 'no spots';
  }
  if (spots === 1) {
    return '1 spot';
  }
  return `${spots} spots`;
};

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}