import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampeFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from "prop-types";

class App extends React.Component {
    
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object,
    };

    componentDidMount() {
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //1. Take a copy of exsisting state
        const fishes = { ... this.state.fishes};
        //2. Add new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes to object state
        this.setState({fishes});
    };

    updateFish = (key, updatedFish) => {
        //1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. Update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        //1. Take a copy of state
        const fishes = { ...this.state.fishes };
        //2. Update that state
        //TODO: (Aleksey Samoylov): add setting status to fish instead of setting fishes[key] = null;
        let fish = fishes[key];
        fish.status = "unavailable";
        fishes[key] = fish;
        //3. Set that to state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampeFishes });
    };

    addToOrder = (key) => {
        //1.Take copy of state
        const order = {...this.state.order};
        //2. Either add to the order Or update the number in order
        order[key] = order[key] +1 || 1;
        //3. Call setState to update our state object
        this.setState({order});
    }

    removeFromOrder = (key) => {
        //1. Take a copy of state
        const order = { ...this.state.order };
        //2. Remove itrm from order
        delete order[key];
        //3. Set that to state
        this.setState({ order });
    }

    render () {
        return (
            <div className="catch-of-the-day ">
                <div className="Menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                                key={key} 
                                index = {key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder} 
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish = {this.updateFish}
                    deleteFish = {this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />

            </div>
        );
    }
}

export default App;