import React from 'react'
import { connect } from 'react-redux';
import { order, updateOrder } from '../../redux/actions';

function Sort({ sortOrder, order, filteredData }) {
    const handleToggleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        order();
        const sortedList = [...filteredData];
        sortedList.sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        updateOrder(sortedList);
    };


    return (
        <div>
            <label>Ascending 
                <input type="checkbox" checked={sortOrder === 'asc'} onChange={handleToggleSort}/>
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sortOrder: state.sortOrder,
    filteredData: state.filteredData
});

const mapDispatchToProps = {
    order,
    updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);