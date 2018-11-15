import React from 'react'
import { Tab } from 'semantic-ui-react'
import CreatorScene from "./ceator/CreatorScene";
import HomeScene from "./home/HomeScene";

const panes = [
    { menuItem: '众筹项目', render: () => <Tab.Pane><CreatorScene/></Tab.Pane> },
    { menuItem: '我的众筹', render: () => <Tab.Pane><HomeScene/></Tab.Pane> },
    { menuItem: '我参与的众筹', render: () => <Tab.Pane>我参与的众筹</Tab.Pane> },
]

const TabPanels = () => <Tab panes={panes} />

export default TabPanels
