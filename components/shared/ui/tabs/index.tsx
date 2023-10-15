"use client";
import { FC, ReactNode, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      <div className="tabs__wrapper">
        {tabs.map((tab, index) => (
          <button type="button" key={index} className={`tab ${index === activeTab ? "active" : ""}`} onClick={() => handleTabChange(index)}>
            {tab.label}
          </button>
        ))}
      </div>

      <TransitionGroup component={null}>
        <CSSTransition key={activeTab} timeout={300} classNames="fade">
          <div className="tab-content">{tabs[activeTab].content}</div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
