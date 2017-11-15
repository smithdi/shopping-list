import React from 'react';
import Header from './Header';
import Item from './Item';
import AddItem from './AddItem';
import { getAll, createItem, deleteRecord } from '../server';
import { Table } from 'react-bootstrap';

class App extends React.Component{
    constructor() {
        // we cannot use the keyword this until we specify super
        super();

        this.addNewItem = this.addNewItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.getShoppingList = this.getShoppingList.bind(this);

        // get initial state
        this.state = {
            list: {},
            loading: true,
            display: false,
            disableAddItem: false
        };
    }

    componentWillMount() {

        this.setState({ loading: true });
        this.getShoppingList();

    }

    // Get all Items currently saved to the list
    getShoppingList() {
        getAll()
            .then((response) => {
                this.setState({
                    list: response.data,
                    loading: false,
                    display:  response.data.length > 0 ? true : false
                })
            })
            .catch(function (error) {
                console.log(`Error retrieving list - ${error}`);
                alert("There was a problem retrieving the shopping list, please try again");
        });
    }

    addNewItem(item){
        // call the createItem function, and then get all the items in the list
        createItem(item)
            .then((response) => {
                this.getShoppingList();
            })
            .catch(function (error) {
                console.log(`Error adding item to list - ${error}`);
                alert("There was a problem saving the item to your list, please try again");
            });

        
    }

    deleteItem(itemId){
        const items = {...this.state.list};

        deleteRecord(itemId)
            .then((response) => {
                // find item deleted and remove from the State
                let arrItems = Object.keys(items).map((k) => items[k])
                let idx = arrItems.findIndex(x => x.id === itemId);
                arrItems.splice(idx, 1);
        
                // Update state
                this.setState({
                    list: arrItems,
                    display: arrItems.length > 0 ? true : false
                });   
            })
            .catch(function (error) {
                console.log(`Error deleting item from list - ${error}`);
                alert("There was a problem deleting the item from your list, please try again");
            });
    }

    deleteAll(){
        // call deleteItem for each item in State        
        {
            Object
                .keys(this.state.list)
                .map(key => deleteRecord(this.state.list[key].id))
        }
        this.setState({
            list: {},
            display: false
        });
    }

    render(){
        let rownum = 1;
        return (
            <div className="row">
                
                <div className="menu">
                    <Header/>
                    <div className="col-md-6">
                    <AddItem                         
                        addNewItem={this.addNewItem}
                        disableButton={this.state.disableAddItem}/>
                    </div>
                    {/* If items in the shopping list, then display items in table, otherwise just display text */}
                    { this.state.display && 
                        <div className="col-md-6">  
                            <div className="col-md-12">
                                <button className="btn btn-danger pull-right btnDelete" data-toggle="tooltip" data-placement="top" title="Delete all items on the list" onClick={() => {if(confirm('Delete all items from Shopping List?')) {this.deleteAll()}}}>Delete All</button>
                            </div>  
                            <div className="col-md-12 table-responsive">
                                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>  
                                            <th>Quantity</th>                            
                                            <th></th>
                                        </tr>                    
                                    </thead>
                                    <tbody>
                                    {
                                        Object
                                            .keys(this.state.list)
                                            .map(key => <Item 
                                                            key={key} 
                                                            rownum={rownum++} 
                                                            details={this.state.list[key]} 
                                                            deleteItem={this.deleteItem }/>)
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    }
                </div>
                
                { this.state.display === false &&
                    <div className="col-md-6 empty-list">
                        No items in shopping list.
                    </div>
                }
        </div>
        )
    }
}

export default App;