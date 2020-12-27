import {Container, Divider, Grid, Input, Segment, Tab} from "semantic-ui-react";
import React, {Component} from "react";
import GameProfile from "./inventory/game_profile";
import WishProfile from "./wishlist/wish_profile";
import CustomTable from "./friend/search_result";
import PlayTable from "./inventory/play_table";
import WishTable from "./wishlist/wish_table";

const panes = [
  {
    menuItem: 'Inventory',
    render: () => <Tab.Pane attached={false}>
        <PlayTable defaultPages={5}/>

    </Tab.Pane>,
  },
  {
    menuItem: 'WishList',
    render: () => <Tab.Pane attached={false}>
         <Divider inverted section />
         <WishTable defaultPages={5}/>
    </Tab.Pane>,
  }
]

class TabOnChange extends Component {
  state = {
      activeIndex: 1,

  }


  handleRangeChange = (e) => this.setState({ activeIndex: e.target.value })

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { activeIndex } = this.state

    return (
      <div>
        <Tab inverted
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </div>
    )
  }
}

export default TabOnChange