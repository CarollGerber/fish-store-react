import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampeFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        //1. Take a copy of exsisting state
        const fishes = { ... this.state.fishes};
        //2. Add new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes to object state
        this.setState({fishes});
    };

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
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />

            </div>
        );
    }
}

export default App;