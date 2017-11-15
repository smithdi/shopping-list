import React from 'react';

// Component for displaying rows in the table
class Item extends React.Component{

    render() {
        const { details, rownum } = this.props;
        
        return (
            <tr>
                <td>{rownum}</td>
                <td>{details.item.name}</td>
                <td>{details.item.desc}</td>
                <td>
                    {details.item.quantity}
                </td>
                <td>
                    <span data-toggle="tooltip" data-placement="top" title="Delete item" className="glyphicon glyphicon-remove" onClick={() => this.props.deleteItem(details.id)}></span>
                </td>
            </tr>
        )
    }
}

Item.propTypes = {
    deleteItem: React.PropTypes.func.isRequired
}

export default Item;