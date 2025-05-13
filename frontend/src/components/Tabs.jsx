import React from "react";

function Tabs(props) {
  let tabs = props.data;

  return (
    <div>
      <ol className="tabs">
        {tabs.map((tab) => ((
        <ul key={tab.id}><li><a href={tab.url}>{tab.name}</a></li></ul>
        )))}
      </ol>
    </div>
  );
}

export default Tabs;