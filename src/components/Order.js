import React from 'react';
import { formatPrice } from "../helpers";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        removeFromOrder: PropTypes.func,
        order: PropTypes.object
    }

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish.status === 'available'; 
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: {enter:500, exit:500}
        }

        //Make sure the fish is loaded before we continue
        if (!fish) return null;

        if(!isAvailable) {
            
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>Sorry {fish ? fish.name : 'Fish'} is no longer available.</li>
                </CSSTransition>
            );
            
        }
        return( 
            <CSSTransition {...transitionOptions}>
            <li key={key}>
                <span>
                    <TransitionGroup component="span" className="count" >
                        <CSSTransition {...transitionOptions}>
                            <span>{count}</span>
                        </CSSTransition>
                    </TransitionGroup>
                lbs {fish.name} 
                {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFromOrder(key)}>x</button>
                </span>
            </li>
            </CSSTransition>
            );
    }

    render () {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count*fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>                
                <div className="total">
                Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}
export default Order;