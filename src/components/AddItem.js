import React from 'react';

class AddItem extends React.Component{
    constructor(){
        super();
        this.state = {
            validName: false,
            validDesc: false,
            validQty: false
        };
    }

    handleChange(e) {
        // if value entered then update flag for field
        const name = e.target.name;
        const value = e.target.value;
        
        switch (name){
            case "name":
                this.setState({validName: value.length > 0 ? true: false});
                break;
            case "desc":
                this.setState({validDesc: value.length > 0 ? true: false});
                break;
            case "quantity":
                this.setState({validQty: value.length > 0 ? true: false});
                break;
            default:
                break;
        }
    }

    createNewItem(event){
        event.preventDefault();
        const newItem = {
            name: this.name.value,
            desc: this.desc.value,
            quantity: this.quantity.value,
        }

        this.props.addNewItem(newItem);

        // reset fields on form
        this.addItemForm.reset();
    }
    
    render (){
        
        const disableBtn = this.props.disableButton;

        return (
            <div className="newItem">
                <h4 className="hdr">New Item</h4>

                <form className="form-horizontal" ref={(input) => this.addItemForm = input} onSubmit={(e) => this.createNewItem(e)}>
                    <div className="form-group">
                        <label htmlFor="name" className="control-label col-xs-2">Food</label>
                        <div className="col-xs-10">
                            <input name="name" ref={(input) => this.name = input} className="form-control" type="text" placeholder="food" onChange={(e) => this.handleChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc" className="control-label col-xs-2">Description</label>
                        <div className="col-xs-10">
                            <textarea name="desc" className="form-control" ref={(input) => this.desc = input} placeholder="description" onChange={(e) => this.handleChange(e)}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity" className="control-label col-xs-2">Quantity</label>
                        <div className="col-xs-10">
                            <input name="quantity" className="form-control" ref={(input) => this.quantity = input} type="number" placeholder="quantity" onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-offset-2 col-xs-10">
                            <button type="submit" className="btn btn-primary" disabled={!this.state.validName || !this.state.validDesc || !this.state.validQty}>Add Item</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddItem.propTypes = {
    addNewItem: React.PropTypes.func.isRequired
}

export default AddItem;